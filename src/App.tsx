import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Future from './components/Future';
import Dashboard from './components/Dashboard';
import Roadmap from './components/Roadmap';
import GetStarted from './components/GetStarted';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Onboarding from './pages/Onboarding';
import GoogleAutosuggestRanking from './pages/GoogleAutosuggestRanking';
import AIAutomation from './pages/AIAutomation';
import BlogAdmin from './pages/BlogAdmin';

import SEOHead from './components/SEOHead';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <SEOHead />
                <Hero />
                <Future />
                <Dashboard />
                <Roadmap />
                <GetStarted />
                <Contact />
                <FinalCTA />
              </main>
              <Footer />
            </div>
          } />
                      <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog-admin" element={<BlogAdmin />} />
            <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/google-autosuggest-ranking" element={<GoogleAutosuggestRanking />} />
                      <Route path="/lead-gen-ai-automation" element={<AIAutomation />} />
          <Route path="*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <SEOHead 
                  title="Page Not Found | Effective Marketer"
                  description="The page you're looking for doesn't exist. Explore our AI SEO services and Google Autosuggest optimization solutions."
                  noIndex={true}
                />
                <div className="py-20 text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                  <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                  <div className="space-y-4">
                    <a href="/" className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 mr-4">
                      Go Home
                    </a>
                    <a href="/google-autosuggest-ranking" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors duration-200">
                      AI SEO Services
                    </a>
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;