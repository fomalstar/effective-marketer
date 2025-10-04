import Link from "next/link";
import {
  Mail,
  Globe,
  Facebook,
  Linkedin,
  Search,
  Brain,
  Map,
  Mail as MailIcon,
} from "lucide-react";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/effectivemarketercom",
    label: "Facebook page",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/effective-marketer",
    label: "LinkedIn page",
  },
];

const services = [
  { name: "Google Autosuggests", href: "/google-autosuggest-ranking", icon: Search },
  { name: "AI SEO", href: "/ai-seo", icon: Brain },
  { name: "AI Topical Map", href: "/ai-topical-map", icon: Map },
  { name: "AI Lead Gen", href: "/lead-gen-ai-automation", icon: MailIcon },
];

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "Case Studies", href: "/case-studies" },
      { name: "Our Team", href: "#team" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Success Stories", href: "#" },
      { name: "Optimization Tools", href: "#" },
      { name: "Knowledge Center", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-primary-500">Effective</span>
                <span className="text-white"> Marketer</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Leading AI SEO agency specializing in Google Autosuggests, AI platform optimization, and Generative Engine Optimization (GEO). We get your brand cited by ChatGPT, Gemini, and AI Overviews while dominating search suggestions.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500" />
                <span className="text-gray-400">contact@effectivemarketer.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-primary-500" />
                <span className="text-gray-400">effectivemarketer.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-primary-500 transition-colors duration-200"
                  >
                    <service.icon className="h-4 w-4" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary-500 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2025 Effective Marketer. All rights reserved.</p>
            </div>

            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            <div className="flex space-x-6 text-gray-400">
              <Link
                href="#"
                className="hover:text-primary-500 transition-colors duration-200"
                aria-label="Privacy Policy"
                title="Privacy Policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-primary-500 transition-colors duration-200"
                aria-label="Terms of Service"
                title="Terms of Service"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
