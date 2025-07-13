import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Activity, Target, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useHealthScore } from '@/hooks/useHealthScore';
import { useSymptomLogger } from '@/hooks/useSymptomLogger';
import { useGameification } from '@/hooks/useGameification';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  mood?: '😊' | '😔' | '😰' | '😌' | '😴';
}

interface PersonalizedContext {
  name: string;
  pregnancyWeek?: number;
  hasPCOS: boolean;
  currentHealthScore: number;
  recentSymptoms: string[];
  balanceStatus: string;
  gamificationLevel: number;
  totalPoints: number;
}

export const PersonalizedAIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { profile } = useProfile();
  const { healthResult, healthFactors } = useHealthScore();
  const { symptoms } = useSymptomLogger();
  const { userPoints } = useGameification();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message based on user context
  useEffect(() => {
    if (profile && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'ai',
        content: generatePersonalizedWelcome(),
        timestamp: new Date(),
        mood: '😊'
      };
      setMessages([welcomeMessage]);
    }
  }, [profile]);

  const generatePersonalizedWelcome = (): string => {
    if (!profile) return "Hello! I'm JANANI's AI assistant. How can I help you today?";
    
    const name = profile.full_name || 'Beautiful Mama';
    const week = profile.pregnancy_week;
    const healthScore = healthResult.finalScore;
    const status = healthResult.status;
    
    let welcome = `🌸 Hello ${name}! `;
    
    if (week) {
      welcome += `Congratulations on reaching week ${week} of your pregnancy journey! `;
    }
    
    if (status === 'Stable' && healthScore >= 8) {
      welcome += `Your health is in beautiful harmony (${healthScore}/10)! I'm here to help you maintain this wonderful balance. `;
    } else if (status === 'Caution') {
      welcome += `I see some areas where we can work together to improve your health balance. Don't worry - every small step counts! `;
    } else if (status === 'Critical') {
      welcome += `I'm here to support you through this challenging time. Let's work together to bring your health back into balance. `;
    }
    
    if (profile.has_pcos) {
      welcome += `As someone managing PCOS during pregnancy, I'm specially equipped to provide guidance that considers your unique needs. `;
    }
    
    welcome += `\n\nWhat would you like to talk about today? I can help with symptoms, nutrition, exercise, or just listen if you need someone to talk to. 💕`;
    
    return welcome;
  };

  const generatePersonalizedResponse = (userMessage: string): string => {
    const context = buildPersonalizedContext();
    const lowerMessage = userMessage.toLowerCase();
    
    // Symptom-related queries
    if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('nausea') || lowerMessage.includes('tired')) {
      return generateSymptomResponse(userMessage, context);
    }
    
    // Health score queries
    if (lowerMessage.includes('score') || lowerMessage.includes('health') || lowerMessage.includes('balance')) {
      return generateHealthScoreResponse(context);
    }
    
    // PCOS-related queries
    if (lowerMessage.includes('pcos') || lowerMessage.includes('pcod')) {
      return generatePCOSResponse(context);
    }
    
    // Nutrition queries
    if (lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
      return generateNutritionResponse(context);
    }
    
    // Exercise queries
    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('activity')) {
      return generateExerciseResponse(context);
    }
    
    // Emotional support
    if (lowerMessage.includes('worried') || lowerMessage.includes('scared') || lowerMessage.includes('anxious') || lowerMessage.includes('stress')) {
      return generateEmotionalSupportResponse(context);
    }
    
    // Gamification and motivation
    if (lowerMessage.includes('point') || lowerMessage.includes('reward') || lowerMessage.includes('motivation')) {
      return generateMotivationResponse(context);
    }
    
    // General response with personalization
    return generateGeneralResponse(userMessage, context);
  };

  const buildPersonalizedContext = (): PersonalizedContext => {
    return {
      name: profile?.full_name || 'Beautiful Mama',
      pregnancyWeek: profile?.pregnancy_week || undefined,
      hasPCOS: profile?.has_pcos || false,
      currentHealthScore: healthResult.finalScore,
      recentSymptoms: symptoms.slice(0, 3).map(s => s.symptom_type),
      balanceStatus: healthResult.balanceStatus,
      gamificationLevel: userPoints?.level || 1,
      totalPoints: userPoints?.total_points || 0
    };
  };

  const generateSymptomResponse = (message: string, context: PersonalizedContext): string => {
    const { name, pregnancyWeek, currentHealthScore, recentSymptoms } = context;
    
    let response = `${name}, I understand you're experiencing some discomfort. `;
    
    if (pregnancyWeek) {
      if (pregnancyWeek <= 12) {
        response += `During the first trimester (week ${pregnancyWeek}), symptoms like nausea, fatigue, and tender breasts are very common. `;
      } else if (pregnancyWeek <= 27) {
        response += `In the second trimester (week ${pregnancyWeek}), you might experience different symptoms as your body continues to change. `;
      } else {
        response += `As you're in the third trimester (week ${pregnancyWeek}), your body is working hard to prepare for delivery. `;
      }
    }
    
    if (recentSymptoms.length > 0) {
      response += `I see you've recently logged: ${recentSymptoms.join(', ')}. `;
    }
    
    if (currentHealthScore >= 8) {
      response += `Your overall health balance is strong (${currentHealthScore}/10), which suggests your body is managing well. `;
    } else if (currentHealthScore >= 6) {
      response += `Your health score (${currentHealthScore}/10) shows some areas for improvement, which might be connected to your symptoms. `;
    } else {
      response += `Your health score (${currentHealthScore}/10) indicates we should focus on supporting your body through this time. `;
    }
    
    response += `\n\n💡 Here are some gentle suggestions:\n`;
    response += `• Rest when your body asks for it\n`;
    response += `• Stay hydrated with small, frequent sips\n`;
    response += `• Try gentle movement if you feel up to it\n`;
    response += `• Remember: every pregnancy is unique\n\n`;
    response += `⚠️ If symptoms are severe or concerning, please contact your healthcare provider. I'm here to support, not replace medical care. 💕`;
    
    return response;
  };

  const generateHealthScoreResponse = (context: PersonalizedContext): string => {
    const { name, currentHealthScore, balanceStatus } = context;
    
    let response = `${name}, let's talk about your health balance! `;
    
    if (currentHealthScore >= 9) {
      response += `Your Health Score of ${currentHealthScore}/10 is absolutely amazing! 🌺 You've achieved beautiful harmony across all health areas. `;
    } else if (currentHealthScore >= 7.5) {
      response += `Your Health Score of ${currentHealthScore}/10 is really good! 🌸 You're doing well with most areas. `;
    } else if (currentHealthScore >= 6) {
      response += `Your Health Score of ${currentHealthScore}/10 shows room for gentle improvement. 🌿 `;
    } else {
      response += `Your Health Score of ${currentHealthScore}/10 suggests we should focus on bringing things back into balance. 🌱 `;
    }
    
    response += `Your balance status is "${balanceStatus}" - `;
    
    if (balanceStatus === 'Harmonious') {
      response += `which means all your health factors are working beautifully together! This is the harmony we aim for. `;
    } else if (balanceStatus === 'Moderate') {
      response += `which means most areas are doing well, but we can fine-tune the balance. `;
    } else {
      response += `which means some areas need more attention to achieve harmony. Don't worry - small changes can make a big difference! `;
    }
    
    response += `\n\nThe balanced approach means all factors work together for your wellness. Think of it like a garden - everything needs to work together for the most beautiful blooms! 🌷`;
    
    return response;
  };

  const generatePCOSResponse = (context: PersonalizedContext): string => {
    const { name, hasPCOS, pregnancyWeek } = context;
    
    if (!hasPCOS) {
      return `${name}, while you don't have PCOS marked in your profile, I can still share information about PCOS and pregnancy if you're curious. Many women successfully manage PCOS during pregnancy with proper care. Would you like to know more about supporting someone with PCOS? 💕`;
    }
    
    let response = `${name}, managing PCOS during pregnancy requires special attention, and you're doing great by staying aware of it! `;
    
    if (pregnancyWeek) {
      response += `At week ${pregnancyWeek}, it's important to continue monitoring your blood sugar levels and maintaining steady nutrition. `;
    }
    
    response += `\n\n🌿 PCOS-friendly pregnancy tips:\n`;
    response += `• Focus on balanced meals with protein and fiber\n`;
    response += `• Monitor blood sugar levels regularly\n`;
    response += `• Gentle, consistent exercise\n`;
    response += `• Adequate sleep (7-9 hours)\n`;
    response += `• Stress management techniques\n`;
    response += `• Regular check-ups with your healthcare team\n\n`;
    response += `Remember, many women with PCOS have healthy pregnancies! Your awareness and proactive approach are already helping you succeed. 💪✨`;
    
    return response;
  };

  const generateNutritionResponse = (context: PersonalizedContext): string => {
    const { name, pregnancyWeek, hasPCOS } = context;
    
    let response = `${name}, nutrition during pregnancy is so important, and I'm glad you're thinking about it! `;
    
    if (pregnancyWeek) {
      if (pregnancyWeek <= 12) {
        response += `During early pregnancy (week ${pregnancyWeek}), focus on foods that sit well with you and provide steady energy. `;
      } else if (pregnancyWeek <= 27) {
        response += `In the second trimester (week ${pregnancyWeek}), your appetite might be returning - this is a great time to focus on nutrient-dense foods. `;
      } else {
        response += `In late pregnancy (week ${pregnancyWeek}), smaller, frequent meals often work better as baby takes up more space. `;
      }
    }
    
    if (hasPCOS) {
      response += `With PCOS, focusing on balanced blood sugar is extra important. `;
    }
    
    response += `\n\n🥗 Nourishing suggestions:\n`;
    response += `• Protein with each meal (eggs, yogurt, beans, lean meats)\n`;
    response += `• Colorful fruits and vegetables\n`;
    response += `• Whole grains for sustained energy\n`;
    response += `• Healthy fats (avocado, nuts, olive oil)\n`;
    response += `• Plenty of water throughout the day\n`;
    
    if (hasPCOS) {
      response += `• Pair carbs with protein to stabilize blood sugar\n`;
      response += `• Choose low-glycemic index foods when possible\n`;
    }
    
    response += `\n💡 Remember: Listen to your body and eat when you're hungry. Growing a baby is hard work! 🤱`;
    
    return response;
  };

  const generateExerciseResponse = (context: PersonalizedContext): string => {
    const { name, pregnancyWeek, currentHealthScore } = context;
    
    let response = `${name}, movement during pregnancy is wonderful for both you and baby! `;
    
    if (pregnancyWeek) {
      if (pregnancyWeek <= 12) {
        response += `In early pregnancy (week ${pregnancyWeek}), listen to your energy levels - some days you might feel great, others you might need more rest. `;
      } else if (pregnancyWeek <= 27) {
        response += `The second trimester (week ${pregnancyWeek}) is often when energy returns - a great time for gentle, consistent movement! `;
      } else {
        response += `In late pregnancy (week ${pregnancyWeek}), focus on movements that feel good and help prepare your body for delivery. `;
      }
    }
    
    if (currentHealthScore >= 8) {
      response += `Your activity score is contributing well to your overall health balance! `;
    } else {
      response += `Gentle movement could help boost your overall health score and well-being. `;
    }
    
    response += `\n\n🏃‍♀️ Pregnancy-safe activities:\n`;
    response += `• Walking (start with 10-15 minutes)\n`;
    response += `• Prenatal yoga or stretching\n`;
    response += `• Swimming (if available)\n`;
    response += `• Pelvic floor exercises\n`;
    response += `• Deep breathing and meditation\n`;
    response += `• Dancing to your favorite music\n\n`;
    response += `⚠️ Always consult your healthcare provider before starting new exercise routines. The key is consistency over intensity! 💃✨`;
    
    return response;
  };

  const generateEmotionalSupportResponse = (context: PersonalizedContext): string => {
    const { name, pregnancyWeek } = context;
    
    let response = `Oh ${name}, I hear you, and it's completely normal to feel this way. `;
    
    if (pregnancyWeek) {
      response += `Pregnancy brings so many physical and emotional changes, especially around week ${pregnancyWeek}. `;
    }
    
    response += `Your feelings are valid, and you're not alone in this journey. 🤗\n\n`;
    response += `🌸 Gentle reminders:\n`;
    response += `• You're doing an amazing job, even when it doesn't feel like it\n`;
    response += `• It's okay to have difficult days\n`;
    response += `• Your body is doing something incredible\n`;
    response += `• This phase will pass\n`;
    response += `• You deserve support and care\n\n`;
    response += `💕 Some comforting activities:\n`;
    response += `• Take slow, deep breaths\n`;
    response += `• Call a friend or family member\n`;
    response += `• Take a warm bath or shower\n`;
    response += `• Listen to calming music\n`;
    response += `• Write down three things you're grateful for\n\n`;
    response += `If these feelings persist or feel overwhelming, please reach out to your healthcare provider or a mental health professional. You deserve all the support! 💖`;
    
    return response;
  };

  const generateMotivationResponse = (context: PersonalizedContext): string => {
    const { name, gamificationLevel, totalPoints } = context;
    
    let response = `${name}, I love that you're staying motivated! `;
    
    response += `You're currently at level ${gamificationLevel} with ${totalPoints} points - that's fantastic progress! 🌟\n\n`;
    response += `🏆 Ways to earn more points:\n`;
    response += `• Log daily symptoms (+5 points)\n`;
    response += `• Update health records (+10 points)\n`;
    response += `• Complete profile information (+15 points)\n`;
    response += `• Maintain healthy habits consistently (+5 points daily)\n\n`;
    response += `🌸 Remember, these points represent real achievements in caring for yourself and your baby. Every small action matters!\n\n`;
    response += `Your journey is unique and beautiful. Keep blooming, one day at a time! 🌺✨`;
    
    return response;
  };

  const generateGeneralResponse = (message: string, context: PersonalizedContext): string => {
    const { name, pregnancyWeek, currentHealthScore } = context;
    
    let response = `${name}, thank you for sharing with me. `;
    
    if (pregnancyWeek) {
      response += `As you navigate week ${pregnancyWeek} of your pregnancy, `;
    }
    
    response += `I'm here to support you however I can. `;
    
    if (currentHealthScore >= 8) {
      response += `Your health is in great balance right now, which is wonderful to see! `;
    } else {
      response += `Let's work together to support your health and well-being. `;
    }
    
    response += `\n\nIs there something specific you'd like help with today? I can assist with:\n`;
    response += `• Symptom management and tracking\n`;
    response += `• Nutrition and meal planning\n`;
    response += `• Safe exercise during pregnancy\n`;
    response += `• PCOS management (if applicable)\n`;
    response += `• Emotional support and encouragement\n`;
    response += `• Understanding your health scores\n\n`;
    response += `I'm here to listen and support you through this beautiful journey! 🌷💕`;
    
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generatePersonalizedResponse(inputMessage),
        timestamp: new Date(),
        mood: '😊'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 h-[600px] flex flex-col">
      <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-pink-100">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">JANANI AI Assistant</h3>
          <p className="text-sm text-gray-600">Personalized care for your journey</p>
        </div>
        {profile && (
          <div className="ml-auto flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3 text-pink-500" />
              <span>{healthResult.finalScore}/10</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="h-3 w-3 text-purple-500" />
              <span>Lv.{userPoints?.level || 1}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-pink-50 text-gray-800 border border-pink-100'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'ai' && (
                  <Bot className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                {message.type === 'ai' && message.mood && (
                  <span className="text-lg">{message.mood}</span>
                )}
              </div>
              <div className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-pink-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-pink-50 border border-pink-100 p-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-pink-500" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-3 border-t border-pink-100 pt-4">
        <div className="flex-1">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your pregnancy journey..."
            className="w-full p-3 border border-pink-200 rounded-2xl resize-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            rows={2}
          />
        </div>
        <Button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 p-3 rounded-2xl"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};