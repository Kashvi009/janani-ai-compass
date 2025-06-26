
import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

const research = [
  {
    title: 'WHO Pregnancy Risk Guidelines',
    description: 'World Health Organization guidelines on maternal health risk assessment and prevention strategies.',
    link: '#',
    category: 'International Standards'
  },
  {
    title: 'ICMR Maternal Mortality Reports',
    description: 'Indian Council of Medical Research studies on reducing maternal mortality through technology intervention.',
    link: '#',
    category: 'Indian Research'
  },
  {
    title: 'AI in Pregnancy Care Research',
    description: 'Peer-reviewed studies on artificial intelligence applications in prenatal care and risk prediction.',
    link: '#',
    category: 'AI Research'
  },
  {
    title: 'Digital Health for Rural Areas',
    description: 'Research on implementing digital health solutions in rural and underserved communities.',
    link: '#',
    category: 'Digital Health'
  }
];

export const Research = () => {
  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Research & Evidence
            </span>
            <br />
            <span className="text-gray-800">Behind Our Care</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform is built on solid scientific foundation and evidence-based medical research.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {research.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-pink-100">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-pink-100 p-3 rounded-xl">
                  <FileText className="h-6 w-6 text-pink-600" />
                </div>
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <a href={item.link} className="inline-flex items-center text-pink-600 hover:text-pink-700 font-semibold">
                Learn More
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Acknowledgements</h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We extend our heartfelt gratitude to the medical professionals, researchers, and communities who have contributed to making JANANI a reality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">👩‍⚕️ Medical Advisors</h4>
              <p className="text-sm text-gray-600">Leading gynecologists and maternal health specialists</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">🏥 Healthcare Institutions</h4>
              <p className="text-sm text-gray-600">Partner hospitals and medical research centers</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <h4 className="font-semibold text-gray-800 mb-2">👥 Community Leaders</h4>
              <p className="text-sm text-gray-600">Women's health advocates and community organizers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
