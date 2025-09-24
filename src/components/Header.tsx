import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Target, Menu, X, Monitor } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: 'https://effectivemarketer.com/' },
    { name: 'AI SEO', href: 'https://effectivemarketer.com/google-autosuggest-ranking' },
    { name: 'AI Lead Gen', href: 'https://effectivemarketer.com/lead-gen-ai-automation' },
    { name: 'Contact', href: 'https://effectivemarketer.com/#contact' },
  ];

  const handleNavigation = (href: string) => {
    // For external links, use window.location
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
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.href);
                }}
                className="text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
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
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
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