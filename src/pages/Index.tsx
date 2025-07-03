
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { AIModelExplanation } from "@/components/AIModelExplanation";
import { SmartQuestionnaire } from "@/components/SmartQuestionnaire";
import { PCOSTracker } from "@/components/PCOSTracker";
import { UltrasoundScheduler } from "@/components/UltrasoundScheduler";
import { FacialLogin } from "@/components/FacialLogin";
import { WorkoutWellness } from "@/components/WorkoutWellness";
import { SymptomAnalyzer } from "@/components/SymptomAnalyzer";
import { AIChatbot } from "@/components/AIChatbot";
import { AIAssistant } from "@/components/AIAssistant";
import { FamilyMemberMode } from "@/components/FamilyMemberMode";
import { Research } from "@/components/Research";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div className="text-center py-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Link 
          to="/auth"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
        >
          Get Started - Join JANANI
        </Link>
      </div>
      <Features />
      <AIModelExplanation />
      <SmartQuestionnaire />
      <PCOSTracker />
      <UltrasoundScheduler />
      <FacialLogin />
      <WorkoutWellness />
      <SymptomAnalyzer />
      <AIChatbot />
      <AIAssistant />
      <FamilyMemberMode />
      <Research />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
