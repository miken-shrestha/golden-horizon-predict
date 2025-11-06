import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { currentPrice, historicalData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Predicting gold price with current price:", currentPrice);

    const systemPrompt = `You are an AI expert in gold price prediction for the Nepal market. Analyze the current gold price and provide a prediction for tomorrow.

Your analysis should consider:
- Recent price trends in Nepal's gold market
- Global gold market influences
- Nepal's remittance flows impact on gold demand
- Seasonal buying patterns in Nepal
- Currency fluctuation effects (NPR to USD)

Return your prediction in the following JSON format:
{
  "predictedPrice": <number>,
  "confidence": "<high|medium|low>",
  "trend": "<up|down>",
  "reasoning": "<brief explanation>"
}

Be realistic - daily price changes are typically small (0.5% - 2%).`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: `Current Nepal gold price: NPR ${currentPrice} per tola. Historical trend: ${historicalData || 'slight upward trend'}. Predict tomorrow's price.` 
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway request failed");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    console.log("AI Response:", aiResponse);

    // Parse the JSON response from AI
    let prediction;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        prediction = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback to a simple prediction
      prediction = {
        predictedPrice: currentPrice * (1 + (Math.random() - 0.4) * 0.02),
        confidence: "medium",
        trend: Math.random() > 0.5 ? "up" : "down",
        reasoning: "Using fallback prediction due to parsing error"
      };
    }

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in predict-gold-price function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
