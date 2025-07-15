
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Instagram, Heart, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-800">Gold Price Prediction Model</h3>
            </div>
            <p className="text-gray-600 text-sm">
              AI-powered gold price prediction platform using machine learning to provide accurate market insights and forecasts.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <a href="mailto:mikenxtha@gmail.com" className="text-sm hover:text-yellow-600 transition-colors">
                  mikenxtha@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <a href="tel:9860394095" className="text-sm hover:text-yellow-600 transition-colors">
                  9860394095
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Kageswor Manohora, Mulpani</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Instagram className="h-4 w-4" />
                <a 
                  href="https://www.instagram.com/_miken_xtha__/?__pwa=1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm hover:text-yellow-600 transition-colors"
                >
                  @_miken_xtha__
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors">About Us</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors">How It Works</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors">Data Sources</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors">API Documentation</a>
            </div>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Legal & Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors">Privacy Policy</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors">Terms of Service</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors">Disclaimer</a>
              <a href="#" className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors">Support & FAQ</a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © 2024 Gold Price Prediction Model. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            Made with <Heart className="h-4 w-4 text-red-500" /> using AI-powered predictions
          </div>
        </div>
      </div>
    </footer>
  );
};
