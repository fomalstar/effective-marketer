import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactProps {
  title?: string;
  description?: string;
  showInfo?: boolean;
  infoTitle?: string;
  infoDescription?: string;
  infoEmailLabel?: string;
  infoEmail?: string;
  infoResponseLabel?: string;
  infoResponseValue?: string;
  infoLocationsLabel?: string;
  infoLocations?: string;
  stepsTitle?: string;
  steps?: string[];
}

const Contact: React.FC<ContactProps> = ({
  title = 'Get Your Free Autocomplete Analysis',
  description = 'Ready to dominate Google autocomplete suggestions? Complete the form below for a comprehensive analysis of your autocomplete opportunities and GEO potential.',
  showInfo = true,
  infoTitle = 'Connect With Our Experts',
  infoDescription = 'Ready to dominate search suggestions? Our team of GEO and autocomplete specialists is ready to help you appear in Google autocomplete suggestions and get recommended by AI platforms before your competitors.',
  infoEmailLabel = 'Email Support',
  infoEmail = 'contact@effectivemarketer.com',
  infoResponseLabel = 'Response Guarantee',
  infoResponseValue = '24-hour response commitment',
  infoLocationsLabel = 'International Reach',
  infoLocations = 'USA • France • Vietnam • Bulgaria',
  stepsTitle = 'Your Next Steps',
  steps = [
    'Free autocomplete and GEO analysis of your industry',
    '30-minute strategy call within 24 hours',
    'Custom roadmap to dominate autocomplete for your keywords'
  ]
}) => {
  const [formData, setFormData] = useState({
    website: '',
    name: '',
    businessName: '',
    email: '',
    phone: '',
    keywords: '',
    traffic: '',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Initialize EmailJS with public key
      emailjs.init('TicU4eANpHyxQT7Q6');

      // Normalize website URL
      let websiteUrl = formData.website.trim();
      if (websiteUrl && !websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
        websiteUrl = 'https://' + websiteUrl;
      }

      // Prepare template parameters with simpler structure
      const templateParams = {
        user_name: formData.name,
        from_name: formData.businessName,
        user_email: formData.email,
        website: websiteUrl,
        business_name: formData.businessName,
        phone: formData.phone || 'Not provided',
        keywords: formData.keywords,
        traffic: formData.traffic || 'Not specified',
        goals: formData.goals,
        message: formData.goals,
        submission_date: new Date().toLocaleString()
      };

      console.log('Sending email with params:', templateParams);

      // Send email using EmailJS
      const result = await emailjs.send('service_p70onc9', 'template_mn8h5de', templateParams);
      
      console.log('EmailJS result:', result);

      setSubmitStatus('success');
      setFormData({
        website: '',
        name: '',
        businessName: '',
        email: '',
        phone: '',
        keywords: '',
        traffic: '',
        goals: ''
      });

    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setErrorMessage(`There was an error sending your message: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact us directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const trafficOptions = [
    'Under 1,000 monthly visitors',
    '1,000 - 5,000 monthly visitors',
    '5,000 - 10,000 monthly visitors',
    '10,000 - 50,000 monthly visitors',
    'Over 50,000 monthly visitors'
  ];

  return (
    <section id="contact" className="py-16 lg:py-20 bg-gradient-to-br from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="your website"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="traffic" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Website Traffic
                  </label>
                  <select
                    id="traffic"
                    name="traffic"
                    value={formData.traffic}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select your traffic range</option>
                    {trafficOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Keywords (3-5) *
                </label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="e.g., digital marketing, SEO services, online advertising"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Objectives *
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What are your primary objectives? (e.g., increase organic visibility, enhance brand authority, generate qualified leads)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <span>Thank you for submitting the form! We will get back to you shortly.</span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Get Your Free Analysis</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          {showInfo && (
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{infoTitle}</h3>
                <p className="text-gray-600 text-xl mb-8">
                  {infoDescription}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{infoEmailLabel}</div>
                    <div className="text-gray-600 text-lg">{infoEmail}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{infoResponseLabel}</div>
                    <div className="text-gray-600 text-lg">{infoResponseValue}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{infoLocationsLabel}</div>
                    <div className="text-gray-600 text-lg">{infoLocations}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{stepsTitle}</h4>
                <ul className="space-y-3 text-lg text-gray-600">
                  {steps.map((step, index) => (
                    <li key={step} className="flex items-start">
                      <span className="text-red-500 mr-2">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;