
import { Navigation } from "@/components/Navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AIModelExplanation } from "@/components/AIModelExplanation";
import { Research } from "@/components/Research";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SmoothScroll />
      <Navigation />
      <Hero />
      <div className="text-center py-6 sm:py-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Link 
          to="/auth"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all text-sm sm:text-base"
        >
          Get Started - Join JANANI
        </Link>
      </div>
      <Features />
      <AIModelExplanation />
      <Research />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
