import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Monitor, Sparkles, Map, Search, Brain, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const hoverTimerRef = useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const services = [
    { name: 'Google Autosuggests', href: 'https://effectivemarketer.com/google-autosuggest-ranking', icon: Search, desc: 'Dominate search suggestions before results appear.' },
    { name: 'AI SEO', href: 'https://effectivemarketer.com/ai-seo', icon: Brain, desc: 'Get cited by ChatGPT, Gemini, and AI Overviews.' },
    { name: 'AI Topical Map', href: 'https://effectivemarketer.com/ai-topical-map', icon: Map, desc: 'Entity-rich blueprints built for Generative Intent.' },
    { name: 'AI Lead Gen', href: 'https://effectivemarketer.com/lead-gen-ai-automation', icon: Mail, desc: 'Automated multi-channel lead generation with AI.' },
  ];

  const navigation = [
    { name: 'Home', href: 'https://effectivemarketer.com/' },
    { name: 'Services', href: '#services-mega' },
    { name: 'Case Studies', href: 'https://effectivemarketer.com/case-studies' },
    { name: 'Contact', href: 'https://effectivemarketer.com/#contact' },
  ];

  const handleNavigation = (href: string) => {
    window.location.href = href;
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const handleLogoClick = () => {
    window.location.href = 'https://effectivemarketer.com/';
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const openWithDelay = () => {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => setIsServicesOpen(true), 100);
  };
  const closeWithDelay = () => {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => setIsServicesOpen(false), 180);
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
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-200"
          >
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-primary-500">Effective</span>
              <span className="text-black"> Marketer</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-9">
            <a
              href={navigation[0].href}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(navigation[0].href);
              }}
              className="text-[15px] tracking-tight font-semibold text-gray-800 hover:text-primary-600 transition-colors duration-200"
            >
              {navigation[0].name}
            </a>

            {/* Services Mega Menu Trigger */}
            <div 
              className="relative"
              onMouseEnter={openWithDelay}
              onMouseLeave={closeWithDelay}
            >
              <button 
                className="text-[15px] tracking-tight font-semibold text-gray-800 hover:text-primary-600 transition-colors duration-200 inline-flex items-center py-2"
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
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[960px] bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl p-8" onMouseEnter={openWithDelay} onMouseLeave={closeWithDelay}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {services.map((svc) => (
                      <a
                        key={svc.name}
                        href={svc.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(svc.href);
                        }}
                        className="group rounded-xl p-5 hover:bg-gray-50 transition-colors duration-200 border border-gray-100/50 hover:border-gray-200"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform">
                          <svc.icon className="h-6 w-6" />
                        </div>
                        <div className="font-display text-[15px] leading-tight text-gray-900 font-semibold">{svc.name}</div>
                        <div className="text-[13px] leading-snug text-gray-600 mt-1">{svc.desc}</div>
                        <div className="text-primary-600 text-xs font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Learn more →</div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="https://dash.effectivemarketer.com/" target="_blank" rel="noopener noreferrer" className="col-span-1 md:col-span-2 hidden md:block rounded-xl border border-gray-100 p-5 bg-white hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-semibold text-gray-900 mb-1">Professional SEO Dashboard</div>
                      <p className="text-sm text-gray-600">Track everything in one place with our AI SEO Dashboard — autosuggest rankings, topical map, AI SEO and more.</p>
                      <div className="text-primary-600 text-xs font-medium mt-3">Open dashboard →</div>
                    </a>
                    <a href="https://calendly.com/effectivemarketer/demo" className="rounded-xl border border-primary-200 p-5 bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-colors">
                      <div className="text-sm font-semibold text-primary-800">Talk to an expert</div>
                      <div className="text-xs text-primary-600">Book a free consult →</div>
                    </a>
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
              className="text-[15px] tracking-tight font-semibold text-gray-800 hover:text-primary-600 transition-colors duration-200"
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
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              title="Dashboard"
            >
              <Monitor className="h-6 w-6" />
            </a>
            <a
              href="https://calendly.com/effectivemarketer/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 lg:px-6 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-sm lg:text-base"
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
                className="block w-full text-left px-3 py-2 text-[15px] font-semibold tracking-tight text-gray-800 hover:text-primary-600 transition-colors duration-200"
              >
                {navigation[0].name}
              </a>

              {/* Services list */}
              <div className="px-3">
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-2">Services</div>
                <div className="mt-1 space-y-1">
                  {services.map((svc) => (
                    <a
                      key={svc.name}
                      href={svc.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(svc.href);
                      }}
                      className="flex items-center space-x-2 px-2 py-2 rounded text-[14px] font-semibold tracking-tight text-gray-800 hover:text-primary-600 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 rounded-md bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white">
                        <svc.icon className="h-4 w-4" />
                      </div>
                      <span className="">{svc.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <a
                href={navigation[2].href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(navigation[2].href);
                }}
                className="block w-full text-left px-3 py-2 text-[15px] font-semibold tracking-tight text-gray-800 hover:text-primary-600 transition-colors duration-200"
              >
                {navigation[2].name}
              </a>

              {/* Dashboard and CTA */}
              <a
                href="https://dash.effectivemarketer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Monitor className="h-5 w-5 mr-2" />
                Dashboard
              </a>
              <a
                href="https://calendly.com/effectivemarketer/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-md hover:shadow-lg mt-4"
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