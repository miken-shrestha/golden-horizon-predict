
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Mail, Lock, User, TrendingUp, Shield, Sparkles, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/Auth';

const Login = () => {
  const navigate = useNavigate();
  const { user, login, register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(loginData.email, loginData.password);
    
    if (success) {
      if (loginData.email === 'mikenxtha@gmail.com') {
        toast({
          title: "Welcome Admin!",
          description: "You have successfully logged in as administrator.",
        });
      } else {
        toast({
          title: "Login Successful!",
          description: "Welcome to Nepal Gold Price Prediction.",
        });
      }
      navigate('/');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    const success = await register(registerData.name, registerData.email, registerData.password);
    
    if (success) {
      toast({
        title: "Account Created!",
        description: "Your account has been successfully created.",
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Floating Gold Coins */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`coin-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + Math.sin(i) * 20}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full shadow-lg border-2 border-yellow-400 flex items-center justify-center transform rotate-12">
                <span className="text-yellow-800 text-xs font-bold">₹</span>
              </div>
              <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-50 animate-ping"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Gold Nuggets */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={`nugget-${i}`}
            className="absolute animate-bounce"
            style={{
              right: `${5 + (i * 15)}%`,
              top: `${20 + Math.cos(i) * 25}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${5 + Math.random() * 2}s`,
            }}
          >
            <div className="relative">
              <div className="w-6 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-md border border-yellow-500 transform -rotate-12">
                <div className="w-3 h-2 bg-yellow-300 rounded-full absolute top-0.5 left-1 opacity-80"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Sparkly Gold Bars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={`bar-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${20 + (i * 20)}%`,
              bottom: `${10 + (i * 8)}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${6 + Math.random() * 2}s`,
            }}
          >
            <div className="relative">
              <div className="w-10 h-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-sm shadow-lg border border-yellow-600 transform rotate-6">
                <div className="absolute inset-1 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-sm opacity-60"></div>
                <div className="absolute top-0 left-1 w-1 h-full bg-yellow-200 rounded-sm opacity-80"></div>
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Cartoonish Gold Treasure */}
      <div className="absolute bottom-10 left-10 pointer-events-none">
        <div className="relative animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="w-16 h-12 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-t-full border-2 border-yellow-700 shadow-xl">
            <div className="absolute inset-2 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-full">
              <Coins className="w-6 h-6 text-yellow-200 absolute top-1 left-1/2 transform -translate-x-1/2" />
            </div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-yellow-700 rounded-full"></div>
          </div>
          {[...Array(3)].map((_, i) => (
            <div
              key={`treasure-coin-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${-5 + i * 8}px`,
                top: `${-15 + i * 2}px`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full border border-yellow-400 shadow-sm"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-yellow-400 opacity-70 animate-pulse" />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-full shadow-lg animate-scale-in relative">
              <TrendingUp className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Nepal Gold Predictor
          </h1>
          <p className="text-muted-foreground mt-2">Your gateway to accurate gold price predictions</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-2xl animate-slide-in-right">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-yellow-600" />
              Secure Access
            </CardTitle>
            <CardDescription>
              Access your personalized gold price predictions
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="transition-all duration-300">Login</TabsTrigger>
                <TabsTrigger value="register" className="transition-all duration-300">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="animate-fade-in">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="transition-all duration-300 focus:scale-105 focus:shadow-lg pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="animate-fade-in">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Secure • Encrypted • Trusted by thousands
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
