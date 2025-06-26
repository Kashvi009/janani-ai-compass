
import React from 'react';
import { Heart } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    text: 'JANANI was like a sister beside me every day. The AI predictions helped me catch early signs of gestational diabetes, and my doctor was amazed at how well-prepared I was.',
    trimester: '2nd Trimester',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'Ananya Patel',
    location: 'Bangalore, India',
    text: 'The personalized diet plans and medicine reminders were lifesavers. I never missed a supplement, and my baby was born healthy at 38 weeks.',
    trimester: '3rd Trimester',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face'
  },
  {
    name: 'Meera Krishnan',
    location: 'Chennai, India',
    text: 'As a first-time mother, I was anxious about everything. JANANI\'s gentle guidance and the ability to connect with specialists gave me so much confidence.',
    trimester: 'New Mother',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=400&fit=crop&crop=face'
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Stories of Love
            </span>
            <br />
            <span className="text-gray-800">and Care</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real mothers sharing their journey with JANANI - because every story matters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <span className="inline-block bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full mt-1">
                    {testimonial.trimester}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="h-4 w-4 text-pink-500 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 sm:p-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Join Our Community</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Over 10,000 mothers have trusted JANANI with their pregnancy journey. Be part of a supportive community that celebrates every milestone.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">10,000+</div>
                <div className="text-gray-600">Mothers Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
