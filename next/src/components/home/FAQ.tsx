"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
  className?: string;
}

export default function FAQ({ title, subtitle, faqs, className = "" }: FAQProps) {
  const [closedIndexes, setClosedIndexes] = useState<Set<number>>(new Set());

  const toggleFAQ = (index: number) => {
    setClosedIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className={`py-16 lg:py-20 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {title} <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">FAQ</span>
          </h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isClosed = closedIndexes.has(index);
            return (
              <div key={faq.question} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-6 py-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4 flex-1">{faq.question}</h3>
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 transition-all duration-200 ease-in-out"
                      aria-expanded={!isClosed}
                      aria-controls={`faq-answer-${index}`}
                    >
                      {isClosed ? <Plus className="h-4 w-4 text-gray-600" /> : <Minus className="h-4 w-4 text-gray-600" />}
                    </button>
                  </div>
                  <div
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isClosed ? "max-h-0 opacity-0" : "max-h-96 opacity-100 mt-4"
                    }`}
                  >
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
