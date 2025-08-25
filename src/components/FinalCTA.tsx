import React from 'react';
import { Clock, Target, TrendingUp } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dominate Search Suggestions Before Your Competition
          </h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto opacity-90">
            Secure your position in Google autocomplete suggestions and AI recommendations before your competition discovers this opportunity. We maintain exclusive territories for our clients.
          </p>

          {/* Urgency Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <Target className="h-8 w-8 mx-auto mb-3" />
              <div className="text-xl font-semibold mb-2">Exclusive Territory</div>
              <div className="opacity-90">Protected ranking territories</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <Clock className="h-8 w-8 mx-auto mb-3" />
              <div className="text-xl font-semibold mb-2">6-10 Weeks</div>
              <div className="opacity-90">Rapid implementation timeline</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
              <TrendingUp className="h-8 w-8 mx-auto mb-3" />
              <div className="text-xl font-semibold mb-2">90-Day Promise</div>
              <div className="opacity-90">Complete satisfaction guarantee</div>
            </div>
          </div>

          <div className="space-y-4">
            <a
              href="#contact"
              className="inline-block bg-white text-[#ff312b] px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </a>
            <div className="text-lg opacity-90">
              ✓ 90-day money-back guarantee  ✓ Autocomplete tracking dashboard  ✓ GEO performance monitoring
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA;