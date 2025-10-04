'use client';

import { Linkedin, Users, Award, Target, Brain } from "lucide-react";
import Image from "next/image";
import { teamMembers } from "@/data/teamData";

export default function Team() {
  return (
    <section
      id="team"
      className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
            <Users className="h-5 w-5 text-primary-500" />
            <span className="text-primary-600 font-medium text-sm lg:text-base">
              Our Team
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Meet Our <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Leadership Team</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            What makes Effective Marketer stand out is our unique company culture, which is fundamental to our success. We value rigor, trust, ambition, and authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {member.role}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {member.description}
                </p>

                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Our Team Excellence
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-600">Expert Team Members</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-gray-600">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to work with our expert team?
          </p>
          <a
            href="https://calendly.com/effectivemarketer/demo"
            className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Meet Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
