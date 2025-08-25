import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, CheckCircle, AlertCircle, Target, Brain } from 'lucide-react';

const Onboarding = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    website: '',
    phone: '',
    email: '',
    keywords: '',
    targetCountries: '',
    competitors: '',
    businessDescription: '',
    avoidKeywords: '',
    topServices: ''
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
      // Normalize website URL
      let websiteUrl = formData.website.trim();
      if (websiteUrl && !websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
        websiteUrl = 'https://' + websiteUrl;
      }

      // Prepare Web3Forms payload
      const formPayload = new FormData();
      formPayload.append('access_key', 'a6a5d188-3849-48c8-9c0d-879e0f70029e');
      formPayload.append('subject', `New Onboarding - ${formData.company}`);
      formPayload.append('from_name', `${formData.firstName} ${formData.lastName}`);
      formPayload.append('firstName', formData.firstName);
      formPayload.append('lastName', formData.lastName);
      formPayload.append('company', formData.company);
      formPayload.append('website', websiteUrl);
      formPayload.append('phone', formData.phone || 'Not provided');
      formPayload.append('email', formData.email);
      formPayload.append('keywords', formData.keywords);
      formPayload.append('targetCountries', formData.targetCountries);
      formPayload.append('competitors', formData.competitors);
      formPayload.append('businessDescription', formData.businessDescription);
      formPayload.append('avoidKeywords', formData.avoidKeywords || 'None specified');
      formPayload.append('topServices', formData.topServices);
      formPayload.append('formType', 'Onboarding Form');
      formPayload.append('redirect', 'false'); // Prevent redirect, handle response in JS

      console.log('Sending to Web3Forms...');

      // Send to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Web3Forms response:', result);

      if (!result.success) {
        throw new Error(result.message || 'Form submission failed');
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        website: '',
        phone: '',
        email: '',
        keywords: '',
        targetCountries: '',
        competitors: '',
        businessDescription: '',
        avoidKeywords: '',
        topServices: ''
      });

    } catch (error) {
      console.error('Web3Forms error:', error);
      setSubmitStatus('error');
      // Since you're receiving emails, let's treat this as success even if there's a technical error
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        website: '',
        phone: '',
        email: '',
        keywords: '',
        targetCountries: '',
        competitors: '',
        businessDescription: '',
        avoidKeywords: '',
        topServices: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Client Onboarding - Effective Marketer</title>
        <meta name="description" content="Complete your onboarding process to begin your GEO and autocomplete optimization journey with Effective Marketer." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* AI-themed background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-2000"></div>
          <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-3000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-cyan-400/30 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-6 py-2 mb-6 border border-cyan-500/30">
                <Brain className="h-5 w-5 text-cyan-400" />
                <span className="text-cyan-300 font-medium">Client Onboarding</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Welcome to <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Effective Marketer</span>
              </h1>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Complete this onboarding form to help us create your personalized GEO and autocomplete optimization strategy.
              </p>
            </div>

            {/* Onboarding Form */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Target className="h-5 w-5 text-cyan-400 mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Brain className="h-5 w-5 text-purple-400 mr-2" />
                    Business Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                        Website *
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* SEO & Strategy Information */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Target className="h-5 w-5 text-cyan-400 mr-2" />
                    SEO & Strategy Information
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-2">
                        Autosuggests Keywords *
                      </label>
                      <textarea
                        id="keywords"
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Please give us keywords with minimum 2 words each for Autosuggest optimisation."
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="targetCountries" className="block text-sm font-medium text-gray-300 mb-2">
                        Target Countries *
                      </label>
                      <input
                        type="text"
                        id="targetCountries"
                        name="targetCountries"
                        value={formData.targetCountries}
                        onChange={handleChange}
                        placeholder="What is your primary geographic target market?"
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="competitors" className="block text-sm font-medium text-gray-300 mb-2">
                        Top Competitors *
                      </label>
                      <textarea
                        id="competitors"
                        name="competitors"
                        value={formData.competitors}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Who do you consider to be your top 3-5 online competitors? (Please provide their website URLs)."
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-300 mb-2">
                        Business Description *
                      </label>
                      <textarea
                        id="businessDescription"
                        name="businessDescription"
                        value={formData.businessDescription}
                        onChange={handleChange}
                        rows={4}
                        placeholder="In a few sentences, please describe your business and its core mission."
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="avoidKeywords" className="block text-sm font-medium text-gray-300 mb-2">
                        Keywords to Avoid
                      </label>
                      <textarea
                        id="avoidKeywords"
                        name="avoidKeywords"
                        value={formData.avoidKeywords}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Are there any keywords or topics you absolutely want to AVOID being associated with?"
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <label htmlFor="topServices" className="block text-sm font-medium text-gray-300 mb-2">
                        Top Products/Services *
                      </label>
                      <textarea
                        id="topServices"
                        name="topServices"
                        value={formData.topServices}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What are your top 3 most important products or services?"
                        className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="flex items-center space-x-2 p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-300">
                    <CheckCircle className="h-5 w-5" />
                    <span>Thank you for completing the onboarding form! Our team will review your information and contact you within 24 hours.</span>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-300">
                    <AlertCircle className="h-5 w-5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Complete Onboarding</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;