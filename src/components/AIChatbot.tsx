
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, AlertCircle, Calendar, Pill } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useHealthScore } from '@/hooks/useHealthScore';
import { useSymptomLogger } from '@/hooks/useSymptomLogger';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'symptom' | 'general' | 'emergency' | 'reminder';
}

export const AIChatbot = () => {
  const { profile } = useProfile();
  const { healthResult } = useHealthScore();
  const { symptoms } = useSymptomLogger();
  
  const getPersonalizedGreeting = () => {
    if (!profile) return "Hello! I'm your JANANI AI companion. I'm here to help you with pregnancy-related questions, symptom analysis, health guidance, and PCOS/PCOD support. How can I assist you today?";
    
    const name = profile.full_name ? ` ${profile.full_name.split(' ')[0]}` : '';
    let greeting = `Hello${name}! 💕 I'm your personal JANANI AI companion.`;
    
    if (profile.pregnancy_week) {
      greeting += ` I see you're at ${profile.pregnancy_week} weeks - such an exciting journey!`;
    }
    
    if (profile.has_pcos) {
      greeting += ` I'm here to support you with PCOS management along with your pregnancy care.`;
    }
    
    greeting += " How can I help you today?";
    return greeting;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getPersonalizedGreeting(),
      sender: 'bot',
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update greeting when profile loads
  useEffect(() => {
    if (profile && messages.length === 1) {
      setMessages([{
        id: '1',
        text: getPersonalizedGreeting(),
        sender: 'bot',
        timestamp: new Date(),
        type: 'general'
      }]);
    }
  }, [profile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeSymptoms = (message: string) => {
    const symptoms = {
      'pain': 'abdominal pain, back pain, or pelvic pain',
      'bleeding': 'vaginal bleeding or spotting',
      'nausea': 'morning sickness or nausea',
      'headache': 'headaches or migraines',
      'swelling': 'swelling in hands, feet, or face',
      'fever': 'fever or high temperature',
      'dizziness': 'dizziness or lightheadedness',
      'pcos': 'PCOS or PCOD related symptoms',
      'irregular periods': 'irregular menstrual cycles',
      'acne': 'hormonal acne or skin issues'
    };

    const detectedSymptoms = Object.keys(symptoms).filter(symptom => 
      message.toLowerCase().includes(symptom)
    );

    if (detectedSymptoms.length > 0) {
      return {
        isSymptom: true,
        symptoms: detectedSymptoms,
        advice: getSymptomAdvice(detectedSymptoms)
      };
    }
    return { isSymptom: false };
  };

  const getSymptomAdvice = (symptoms: string[]) => {
    const advice: { [key: string]: string } = {
      'pain': 'Mild discomfort is normal, but severe or persistent pain should be evaluated by your doctor.',
      'bleeding': 'Light spotting can be normal in early pregnancy, but any bleeding should be reported to your healthcare provider.',
      'nausea': 'Try eating small, frequent meals and ginger tea. If severe, consult your doctor about safe medications.',
      'headache': 'Stay hydrated and rest. Avoid medications without consulting your doctor first.',
      'swelling': 'Mild swelling is common, but sudden or severe swelling may indicate preeclampsia - contact your doctor.',
      'fever': 'Fever during pregnancy needs medical attention. Contact your healthcare provider immediately.',
      'dizziness': 'This can be due to low blood pressure. Sit down, drink water, and contact your doctor if it persists.',
      'pcos': 'PCOS requires comprehensive management including lifestyle changes, diet, and medical supervision.',
      'irregular periods': 'Track your cycles and discuss patterns with your gynecologist for proper evaluation.',
      'acne': 'Hormonal acne can be managed with gentle skincare and proper medical guidance.'
    };

    return symptoms.map(symptom => advice[symptom]).join(' ');
  };

  const generateAIResponse = (userMessage: string) => {
    const analysis = analyzeSymptoms(userMessage);
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for health score questions
    if (lowerMessage.includes('health score') || lowerMessage.includes('how am i doing') || lowerMessage.includes('my health')) {
      if (healthResult.finalScore > 0) {
        let response = `Your current health score is ${healthResult.finalScore}/10 (${healthResult.status}) ${healthResult.flowerLevel}. `;
        
        if (healthResult.status === 'Critical') {
          response += "I'm concerned about some indicators. Please consider scheduling a doctor's appointment soon. ";
        } else if (healthResult.status === 'Caution') {
          response += "There are some areas we can improve together. ";
        } else {
          response += "You're doing great! Keep up the good work. ";
        }
        
        if (healthResult.recommendations.length > 0) {
          response += `\n\nMy recommendations: ${healthResult.recommendations[0]}`;
        }
        
        if (profile?.pregnancy_week) {
          response += `At ${profile.pregnancy_week} weeks, `;
          if (profile.pregnancy_week <= 12) {
            response += "focusing on nutrition and managing symptoms is key.";
          } else if (profile.pregnancy_week <= 28) {
            response += "maintaining regular check-ups and staying active is important.";
          } else {
            response += "preparing for delivery and monitoring closely is essential.";
          }
        }
        
        return { text: response, type: 'general' as const };
      }
      return { text: "I'd love to help with your health assessment! Please log some symptoms and vitals first so I can give you personalized insights.", type: 'general' as const };
    }

    // Personalized symptom tracking
    if (lowerMessage.includes('symptoms') || lowerMessage.includes('track') || lowerMessage.includes('log')) {
      const recentSymptoms = symptoms.slice(0, 3);
      let response = "Symptom tracking is so important! ";
      
      if (recentSymptoms.length > 0) {
        response += `I see you've logged symptoms recently: ${recentSymptoms.map(s => s.symptom_type).join(', ')}. `;
      }
      
      if (profile?.has_pcos) {
        response += "With PCOS, tracking irregular periods, mood changes, and weight fluctuations is especially helpful. ";
      }
      
      response += "Would you like me to guide you through logging symptoms or analyzing patterns?";
      return { text: response, type: 'symptom' as const };
    }
    
    if (analysis.isSymptom) {
      let response = `I've analyzed your symptoms. ${analysis.advice}`;
      
      if (profile?.doctor_name) {
        response += ` I recommend discussing this with Dr. ${profile.doctor_name}.`;
      } else {
        response += ` Would you like help finding a qualified healthcare provider?`;
      }
      
      return { text: response, type: 'symptom' as const };
    }

    // General pregnancy and PCOS questions with personalization
    
    if (lowerMessage.includes('pcos') || lowerMessage.includes('pcod')) {
      let response = "";
      if (profile?.has_pcos) {
        response = "I'm here to support your PCOS journey! Since you've indicated you have PCOS, ";
        if (profile.pregnancy_week) {
          response += `managing it during pregnancy (currently at ${profile.pregnancy_week} weeks) requires special attention. `;
        }
        response += "Regular monitoring, a balanced diet, and staying active are key. ";
      } else {
        response = "PCOS/PCOD affects many women and can impact fertility and pregnancy. ";
      }
      response += "I can help you track symptoms, suggest lifestyle modifications, and guide you on when to seek medical care. What specific PCOS concerns do you have?";
      return { text: response, type: 'general' as const };
    }

    if (lowerMessage.includes('trimester') || lowerMessage.includes('week')) {
      let response = "";
      if (profile?.pregnancy_week) {
        const trimester = profile.pregnancy_week <= 12 ? 'first' : profile.pregnancy_week <= 28 ? 'second' : 'third';
        response = `You're currently at ${profile.pregnancy_week} weeks in your ${trimester} trimester! `;
        
        if (trimester === 'first') {
          response += "This is such an important time for organ development. Focus on taking prenatal vitamins, eating well, and managing any morning sickness. ";
        } else if (trimester === 'second') {
          response += "Welcome to the 'golden period'! Many women feel their best now. It's a great time for exercise and preparing the nursery. ";
        } else {
          response += "You're in the final stretch! Focus on rest, preparing for delivery, and monitoring baby's movements closely. ";
        }
        
        if (profile.due_date) {
          const dueDate = new Date(profile.due_date);
          const today = new Date();
          const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          if (daysLeft > 0) {
            response += `You have approximately ${daysLeft} days until your due date!`;
          }
        }
      } else {
        response = "Each trimester brings unique changes. First trimester focuses on organ development, second trimester is often the most comfortable, and third trimester prepares for birth. What specific week or trimester information do you need?";
      }
      return { text: response, type: 'general' as const };
    }

    if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      let response = "Nutrition is crucial during pregnancy! Focus on folate-rich foods, lean proteins, dairy, and plenty of fruits and vegetables. Avoid raw fish, unpasteurized dairy, and limit caffeine. ";
      
      if (profile?.has_pcos) {
        response += "With PCOS, a low glycemic index diet can help manage insulin resistance and hormone levels. ";
      }
      
      if (profile?.pregnancy_week) {
        if (profile.pregnancy_week <= 12) {
          response += "In your first trimester, small frequent meals can help with nausea. ";
        } else if (profile.pregnancy_week <= 28) {
          response += "In your second trimester, focus on iron and calcium-rich foods. ";
        } else {
          response += "In your third trimester, ensure adequate protein and stay hydrated. ";
        }
      }
      
      response += "Would you like a personalized meal plan based on your current stage?";
      return { text: response, type: 'general' as const };
    }

    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('yoga')) {
      return {
        text: "Gentle exercise is beneficial during pregnancy and helps manage PCOS! I recommend prenatal yoga, walking, and swimming. Avoid contact sports and activities with fall risk. Would you like me to suggest some safe exercises for your current stage?",
        type: 'general' as const
      };
    }

    if (lowerMessage.includes('doctor') || lowerMessage.includes('appointment')) {
      let response = "";
      if (profile?.doctor_name) {
        response = `I see you're working with Dr. ${profile.doctor_name}. `;
        if (profile.doctor_phone) {
          response += `You can reach them at ${profile.doctor_phone}. `;
        }
        response += "Would you like help preparing questions for your next appointment? ";
      } else {
        response = "I can help you find qualified gynecologists and maternal specialists in your area. ";
      }
      response += "What type of healthcare support do you need?";
      return { text: response, type: 'general' as const };
    }

    // Default response
    return {
      text: "I'm here to help with all aspects of your pregnancy journey and PCOS/PCOD management. You can ask me about symptoms, nutrition, exercise, doctor visits, or any concerns you have. What would you like to know more about?",
      type: 'general' as const
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: aiResponse.type
      };

      setMessages(prev => [...prev, botMessage]);
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
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-pink-50 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0">
                    {message.type === 'symptom' ? (
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 mt-1" />
                    ) : (
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500 mt-1" />
                    )}
                  </div>
                )}
                <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                {message.sender === 'user' && (
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-pink-200 mt-1 flex-shrink-0" />
                )}
              </div>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-pink-200' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-pink-50 p-2 sm:p-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-pink-500" />
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

      {/* Input - Responsive */}
      <div className="p-3 sm:p-4 border-t border-pink-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about symptoms, PCOS, nutrition..."
            className="flex-1 p-2 sm:p-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-xs sm:text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 sm:p-3 rounded-full hover:shadow-lg transition-all"
          >
            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
