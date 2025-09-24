import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Target, Menu, X, Monitor, Sparkles, Map, Search, Brain } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const services = [
    { name: 'Google Autosuggests', href: 'https://effectivemarketer.com/google-autosuggest-ranking', icon: Search },
    { name: 'AI SEO', href: 'https://effectivemarketer.com/ai-seo', icon: Brain },
    { name: 'AI Topical Map', href: 'https://effectivemarketer.com/ai-topical-map', icon: Map },
    { name: 'AI Lead Gen', href: 'https://effectivemarketer.com/lead-gen-ai-automation', icon: Sparkles },
  ];

  const navigation = [
    { name: 'Home', href: 'https://effectivemarketer.com/' },
    { name: 'Services', href: '#services-mega' },
    { name: 'Contact', href: 'https://effectivemarketer.com/#contact' },
  ];

  const handleNavigation = (href: string) => {
    window.location.href = href;
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.location.href = 'https://effectivemarketer.com/';
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - clickable to go home */}
          <a 
            href="https://effectivemarketer.com/"
            onClick={(e) => {
              e.preventDefault();
              handleLogoClick();
            }}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <Target className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">Effective Marketer</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href={navigation[0].href}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(navigation[0].href);
              }}
              className="text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
            >
              {navigation[0].name}
            </a>

            {/* Services Mega Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className="text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium inline-flex items-center"
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setIsServicesOpen((v) => !v);
                }}
              >
                Services
                <svg className={`ml-2 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Mega Menu Panel */}
              {isServicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-white border border-gray-100 shadow-xl rounded-2xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((svc) => (
                      <a
                        key={svc.name}
                        href={svc.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(svc.href);
                        }}
                        className="group rounded-xl p-4 hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-100"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
                          <svc.icon className="h-5 w-5" />
                        </div>
                        <div className="text-gray-900 font-semibold text-sm">{svc.name}</div>
                        <div className="text-gray-500 text-xs mt-1">Learn more →</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href={navigation[2].href}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(navigation[2].href);
              }}
              className="text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
            >
              {navigation[2].name}
            </a>
          </nav>

          {/* Dashboard Icon and CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://dash.effectivemarketer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
              title="Dashboard"
            >
              <Monitor className="h-6 w-6" />
            </a>
            <a
              href="https://calendly.com/effectivemarketer/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 text-white px-4 lg:px-6 py-2 rounded-lg font-medium hover:bg-red-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-sm lg:text-base"
            >
              Book a Demo
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="space-y-2">
              {/* Home */}
              <a
                href={navigation[0].href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(navigation[0].href);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
              >
                {navigation[0].name}
              </a>

              {/* Services accordion */}
              <div className="px-3">
                <button
                  className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
                  onClick={() => setIsServicesOpen((v) => !v)}
                >
                  <span className="font-medium">Services</span>
                  <svg className={`ml-2 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="mt-1 space-y-1">
                    {services.map((svc) => (
                      <a
                        key={svc.name}
                        href={svc.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(svc.href);
                        }}
                        className="flex items-center space-x-2 px-2 py-2 rounded text-gray-700 hover:text-red-500 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 rounded-md bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white">
                          <svc.icon className="h-4 w-4" />
                        </div>
                        <span>{svc.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <a
                href={navigation[2].href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(navigation[2].href);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
              >
                {navigation[2].name}
              </a>

              {/* Dashboard and CTA */}
              <a
                href="https://dash.effectivemarketer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Monitor className="h-5 w-5 mr-2" />
                Dashboard
              </a>
              <a
                href="https://calendly.com/effectivemarketer/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Demo
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;