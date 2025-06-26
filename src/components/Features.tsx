
import React from 'react';
import { Heart, Calendar, Bell, User, Shield, FileText, Clock, Users, User as UserIcon } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Symptom Tracker',
    description: 'Input symptoms like pain, bleeding, vision, vitals. AI predicts risks and provides recommendations.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Calendar,
    title: 'Personalized Diet',
    description: 'AI-generated nutrition plan tailored to your trimester and health conditions.',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Bell,
    title: 'Medicine Reminders',
    description: 'Smart pill tracker for medications & supplements with timely notifications.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: User,
    title: 'Doctor Connect',
    description: 'Suggests gynecologists & fetal specialists based on your medical history.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Shield,
    title: 'Medical History Vault',
    description: 'Encrypted report and data access for doctors with complete privacy protection.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: FileText,
    title: 'Ultrasound Scheduler',
    description: 'Timeline & calendar notifications for scans and important appointments.',
    color: 'from-teal-500 to-green-500'
  },
  {
    icon: Clock,
    title: 'Emergency Access',
    description: 'Instant contact to local health workers or hospital emergency services.',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Users,
    title: 'Family Share Mode',
    description: 'Selectively share updates with loved ones while maintaining privacy.',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: UserIcon,
    title: 'AI Pre-Medical Analysis',
    description: 'Model-based prediction of early complications with preventive care suggestions.',
    color: 'from-indigo-500 to-blue-500'
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Comprehensive Care
            </span>
            <br />
            <span className="text-gray-800">at Your Fingertips</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature designed with love, powered by AI, and built for the unique journey of motherhood.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-pink-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 sm:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Smart Add-ons for Complete Care</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">🌐 Facial Recognition Login</h4>
                <p className="text-sm text-gray-600">Secure, convenient access to your health data</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">🔐 Privacy by Design</h4>
                <p className="text-sm text-gray-600">End-to-end encryption for all your data</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">🧬 PCOD/PCOS Tracker</h4>
                <p className="text-sm text-gray-600">Specialized care for hormonal conditions</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">🧠 Federated Learning</h4>
                <p className="text-sm text-gray-600">Anonymous data helps improve AI for everyone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
