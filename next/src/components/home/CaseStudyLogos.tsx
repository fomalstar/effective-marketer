import Image from "next/image";

const logos = [
  { name: "Boleron", location: "Bulgaria", src: "/case-studies/boleron.jpg" },
  { name: "Vision Express", location: "Latvia", src: "/case-studies/vision-express.png" },
  { name: "XXL Lashes", location: "Germany", src: "/case-studies/xxl-lashes.png" },
  { name: "Podvertise FM", location: "US", src: "/case-studies/podvertise-fm.png" },
  { name: "Remotek", location: "Bulgaria", src: "/case-studies/remotek.png" },
  { name: "Revita", location: "Bulgaria", src: "/case-studies/revita.jpg" },
];

export default function CaseStudyLogos() {
  return (
    <section id="case-studies" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full px-4 py-2 mb-6 border border-primary-500/30">
            <span className="text-primary-600 font-medium text-sm lg:text-base">
              Success Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Trusted by <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Leading Brands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            We&apos;ve helped businesses across multiple industries achieve unprecedented growth through our innovative AI SEO and Google Autosuggest optimization strategies.
          </p>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {logos.map((logo) => (
              <div key={logo.name} className="group">
                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center border-2 border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-primary-200 group-hover:scale-105">
                  <Image
                    src={logo.src}
                    alt={`${logo.name} logo`}
                    width={64}
                    height={64}
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                    {logo.name}
                  </p>
                  <p className="text-xs text-gray-500">{logo.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
