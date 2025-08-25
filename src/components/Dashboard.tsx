import React from 'react';
import { BarChart3, TrendingUp, MapPin, Link, FileText, Brain, Zap, Target } from 'lucide-react';

const Dashboard = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Autosuggests Tracking",
      description: "Monitor your brand's appearance in AI autocomplete suggestions across all major platforms",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Market Intelligence",
      description: "Real-time insights into competitor strategies and market trends",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Keywords, GEO & Backlinks",
      description: "Comprehensive tracking of keywords, geographic performance, and backlink profiles",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Monthly Reports & Audits",
      description: "Detailed monthly performance reports and automated SEO audits",
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 lg:py-20">
      {/* AI-themed background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-3000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-cyan-400/30 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-6 border border-cyan-500/30">
            <Zap className="h-5 w-5 text-cyan-400" />
            <span className="text-cyan-300 font-medium text-sm lg:text-base">AI-Powered Dashboard</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Effective Marketer Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitor your AI optimization performance with our comprehensive dashboard featuring real-time tracking, market intelligence, and automated reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} shadow-lg`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Dashboard Mockup */}
          <div className="relative">
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 max-w-lg mx-auto border border-cyan-500/30">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-white font-semibold">Effective Marketer Dashboard</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="space-y-4">
                {/* Autosuggests Tracking */}
                <div className="bg-slate-700/50 border border-cyan-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-cyan-300 font-medium">Autosuggests Tracking</h4>
                    <div className="text-green-400 text-sm font-semibold">+127%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">ChatGPT</span>
                      <span className="text-white">89%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Gemini</span>
                      <span className="text-white">76%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Bing AI</span>
                      <span className="text-white">92%</span>
                    </div>
                  </div>
                </div>

                {/* Market Intelligence */}
                <div className="bg-slate-700/50 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-purple-300 font-medium">Market Intelligence</h4>
                    <div className="text-green-400 text-sm font-semibold">+45%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-gray-300">Competitor analysis updated</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span className="text-gray-300">Trend detection active</span>
                    </div>
                  </div>
                </div>

                {/* Keywords & Backlinks */}
                <div className="bg-slate-700/50 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-green-300 font-medium">Keywords & Backlinks</h4>
                    <div className="text-green-400 text-sm font-semibold">+203</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Keywords</div>
                      <div className="text-white font-semibold">1,247</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Backlinks</div>
                      <div className="text-white font-semibold">892</div>
                    </div>
                  </div>
                </div>

                {/* Monthly Report Status */}
                <div className="bg-slate-700/50 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-orange-300 font-medium">Monthly Report</h4>
                    <div className="text-orange-400 text-sm font-semibold">Ready</div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-gray-300">SEO audit completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <a
            href="https://calendly.com/effectivemarketer/demo"
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Access Your Dashboard
          </a>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
