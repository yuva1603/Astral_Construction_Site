import React from 'react';
import { MessageCircle, Globe, Share2, Camera, MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 px-6 md:px-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div>
          <div className="text-2xl font-bold font-sans tracking-tight text-gray-900 mb-6">
            ARK<span className="text-gray-400">HE</span>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Building the future, one landmark at a time. We bring architectural visions to life with precision and passion.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-main hover:bg-brand-main hover:text-white transition-colors">
              <Share2 className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-main hover:bg-brand-main hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-main hover:bg-brand-main hover:text-white transition-colors">
              <Camera className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-main hover:bg-brand-main hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">About Us</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">Our Projects</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">Services</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">Testimonials</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">Careers</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-6">Services</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">Residential Construction</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">Commercial Building</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">Infrastructure</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">Renovation & Remodel</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-main transition-colors">Architectural Design</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-6">Contact Us</h4>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-brand-main shrink-0 mt-1" />
              <span className="text-gray-600">123 Horizon Avenue, Innovation District, New York, NY 10001</span>
            </li>
            <li className="flex items-center space-x-4">
              <Phone className="w-5 h-5 text-brand-main shrink-0" />
              <span className="text-gray-600">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-brand-main shrink-0" />
              <span className="text-gray-600">contact@arkhe.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} ARKHE Construction & Architecture. All rights reserved.
        </p>
        <div className="flex space-x-6 text-sm text-gray-500">
          <a href="#" className="hover:text-brand-main">Privacy Policy</a>
          <a href="#" className="hover:text-brand-main">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
