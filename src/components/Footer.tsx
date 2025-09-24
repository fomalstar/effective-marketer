import React from 'react';
import { Target, Mail, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' }
  ];

  const footerLinks = [
    {
      title: 'Services',
      links: [
        { name: 'Search Suggestion SEO', href: '#services' },
        { name: 'AI Platform Optimization', href: '#services' },
        { name: 'Content Authority Building', href: '#services' },
        { name: 'Digital Presence Enhancement', href: '#services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#team' },
        { name: 'Our Team', href: '#team' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Success Stories', href: '#' },
        { name: 'Optimization Tools', href: '#' },
        { name: 'Knowledge Center', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold">Effective Marketer</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We transform digital marketing by positioning your brand directly in search suggestions and establishing authority across AI platforms, ensuring you appear before competitors even enter the conversation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-500" />
                <span className="text-gray-400">contact@effectivemarketer.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-red-500" />
                <span className="text-gray-400">effectivemarketer.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 Effective Marketer. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-red-500 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-red-500 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;