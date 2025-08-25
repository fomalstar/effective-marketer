import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, Clock, Users, BarChart } from 'lucide-react';

const Roadmap = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
            setVisibleSteps(prev => [...new Set([...prev, stepIndex])]);
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      week: 'Phase 1',
      title: 'Setup & Strategic Planning',
      icon: CheckCircle,
      tasks: [
        'Complete secure payment processing and client onboarding',
        'Conduct comprehensive website analysis and competitive research',
        'Develop strategic content roadmap and keyword targeting',
        'Initialize autocomplete research and GEO opportunity mapping',
        'Launch content development and authority building campaigns'
      ]
    },
    {
      week: 'Week 2',
      title: 'Strategy Presentation',
      icon: Users,
      tasks: [
        'Unveil your personalized performance tracking dashboard',
        'Present detailed website analysis and optimization opportunities',
        'Share comprehensive keyword research and targeting strategy',
        'Review content roadmap and implementation timeline',
        'Finalize strategy approval and campaign launch'
      ]
    },
    {
      week: 'Ongoing',
      title: 'Implementation & Optimization',
      icon: Clock,
      tasks: [
        'Execute content creation and strategic publication schedule',
        'Build high-quality backlinks and establish domain authority',
        'Implement autocomplete optimization and GEO strategies',
        'Monitor autocomplete appearances and AI recommendations',
        'Conduct bi-weekly progress reviews and strategy refinements'
      ]
    },
    {
      week: 'Support',
      title: 'Expert Consultation',
      icon: BarChart,
      tasks: [
        'Access to your dedicated GEO and autocomplete specialist via email',
        'Guaranteed response within 24 hours during business days',
        'Monthly performance reviews and strategic adjustments',
        'Continuous autocomplete monitoring and GEO optimization'
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Path to Autocomplete Dominance
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            A proven methodology to dominate Google autocomplete suggestions and establish authority across AI platforms
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200 hidden lg:block">
            <div 
              className="w-full bg-gradient-to-b from-red-500 to-red-600 transition-all duration-1000 ease-out"
              style={{ 
                height: `${Math.min((visibleSteps.length / steps.length) * 100, 100)}%`,
                boxShadow: '0 0 10px rgba(255, 49, 43, 0.5)'
              }}
            ></div>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative"
                ref={el => stepRefs.current[index] = el}
                data-step={index}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full z-10 hidden lg:block transition-all duration-500 ${
                  visibleSteps.includes(index) 
                    ? 'bg-red-500 scale-110 shadow-lg shadow-red-500/50' 
                    : 'bg-red-200 scale-100'
                }`}>
                  {visibleSteps.includes(index) && (
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
                  )}
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'}`}>
                  {/* Content */}
                  <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className={`bg-white rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                      visibleSteps.includes(index) 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    }`}>
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mr-3 lg:mr-4 transition-all duration-300 ${
                          visibleSteps.includes(index) 
                            ? 'bg-red-500 scale-110' 
                            : 'bg-red-300 scale-100'
                        }`}>
                          <step.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                        </div>
                        <div>
                          <span className="text-red-500 font-medium text-xs lg:text-sm">{step.week}</span>
                          <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {step.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer for alternate layout */}
                  <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} hidden lg:block`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;