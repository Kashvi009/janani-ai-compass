
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, AlertCircle, Calendar, Pill } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'symptom' | 'general' | 'emergency' | 'reminder';
}

export const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your JANANI AI companion. I'm here to help you with pregnancy-related questions, symptom analysis, and health guidance. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      'dizziness': 'dizziness or lightheadedness'
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
      'dizziness': 'This can be due to low blood pressure. Sit down, drink water, and contact your doctor if it persists.'
    };

    return symptoms.map(symptom => advice[symptom]).join(' ');
  };

  const generateAIResponse = (userMessage: string) => {
    const analysis = analyzeSymptoms(userMessage);
    
    if (analysis.isSymptom) {
      return {
        text: `I've analyzed your symptoms. ${analysis.advice} Would you like me to help you schedule a doctor's appointment or provide more specific guidance?`,
        type: 'symptom' as const
      };
    }

    // General pregnancy questions
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('trimester') || lowerMessage.includes('week')) {
      return {
        text: "Each trimester brings unique changes. First trimester focuses on organ development, second trimester is often the most comfortable, and third trimester prepares for birth. What specific week or trimester information do you need?",
        type: 'general' as const
      };
    }

    if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      return {
        text: "Nutrition is crucial during pregnancy! Focus on folate-rich foods, lean proteins, dairy, and plenty of fruits and vegetables. Avoid raw fish, unpasteurized dairy, and limit caffeine. Would you like a personalized meal plan based on your trimester?",
        type: 'general' as const
      };
    }

    if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('yoga')) {
      return {
        text: "Gentle exercise is beneficial during pregnancy! I recommend prenatal yoga, walking, and swimming. Avoid contact sports and activities with fall risk. Would you like me to suggest some safe exercises for your current trimester?",
        type: 'general' as const
      };
    }

    if (lowerMessage.includes('doctor') || lowerMessage.includes('appointment')) {
      return {
        text: "I can help you find qualified gynecologists and maternal specialists in your area. I can also help you prepare questions for your next appointment. What type of healthcare provider are you looking for?",
        type: 'general' as const
      };
    }

    // Default response
    return {
      text: "I'm here to help with all aspects of your pregnancy journey. You can ask me about symptoms, nutrition, exercise, doctor visits, or any concerns you have. What would you like to know more about?",
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
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-pink-100 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 animate-pulse" />
          <div>
            <h3 className="font-semibold">JANANI AI Assistant</h3>
            <p className="text-sm text-pink-100">Your pregnancy companion</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-pink-50 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0">
                    {message.type === 'symptom' ? (
                      <AlertCircle className="h-4 w-4 text-orange-500 mt-1" />
                    ) : (
                      <Bot className="h-4 w-4 text-pink-500 mt-1" />
                    )}
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.sender === 'user' && (
                  <User className="h-4 w-4 text-pink-200 mt-1 flex-shrink-0" />
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
            <div className="bg-pink-50 p-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-pink-500" />
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

      {/* Input */}
      <div className="p-4 border-t border-pink-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about symptoms, nutrition, exercises..."
            className="flex-1 p-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full hover:shadow-lg transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
