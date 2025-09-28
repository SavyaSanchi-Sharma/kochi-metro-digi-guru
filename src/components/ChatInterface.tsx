import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Search, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'search' | 'document' | 'general';
  documents?: string[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant for the Metro Document System. I can help you search documents, answer questions in English or Malayalam, and assist with document management. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      let messageType: 'search' | 'document' | 'general' = 'general';
      let documents: string[] = [];

      // Simple keyword detection for different response types
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('look for')) {
        messageType = 'search';
        response = `I found several documents related to your search. Here are the most relevant ones:`;
        documents = ['Metro Operations Manual', 'Safety Guidelines Malayalam', 'Technical Specifications'];
      } else if (lowerMessage.includes('സുരക്ഷ') || lowerMessage.includes('സെയ്ഫ്റ്റി')) {
        messageType = 'document';
        response = `മെട്രോ സുരക്ഷാ മാർഗനിർദേശങ്ങൾ കണ്ടെത്തി. ഇവിടെ പ്രധാന പോയിന്റുകൾ:

1. പ്ലാറ്റ്ഫോമിൽ യെല്ലോ ലൈനിന് പിന്നിൽ നിൽക്കുക
2. ട്രെയിൻ പൂർണമായി നിർത്തിയശേഷം മാത്രം കയറുക
3. എമർജൻസി അലാറം ഉപയോഗിക്കേണ്ടത് അത്യാവശ്യ സമയത്ത് മാത്രം`;
        documents = ['Safety Guidelines Malayalam'];
      } else if (lowerMessage.includes('operations') || lowerMessage.includes('ഓപ്പറേഷൻ')) {
        messageType = 'document';
        response = `Metro operations information found. Here are the key operational procedures:

1. Daily operational checks and maintenance schedules
2. Passenger flow management protocols
3. Emergency response procedures
4. Staff coordination guidelines

Would you like me to elaborate on any specific operational aspect?`;
        documents = ['Metro Operations Manual', 'Daily Checklist'];
      } else if (lowerMessage.includes('report') || lowerMessage.includes('റിപ്പോർട്ട്')) {
        messageType = 'search';
        response = `I found recent reports in the system:

📊 Monthly Ridership Report - January 2024
📋 Safety Incident Report - Week 3
📈 Performance Metrics - Q1 2024
🔧 Maintenance Status Report

Which report would you like to review?`;
        documents = ['Monthly Report Jan 2024', 'Performance Metrics Q1'];
      } else {
        // General conversation
        const responses = [
          'I understand your query. Let me help you find the relevant information in our document system.',
          'That\'s a great question! I can search through our Metro Rail documentation to provide you with accurate information.',
          'I\'m here to assist you with document search and information retrieval. What specific information are you looking for?',
          'എനിക്ക് മലയാളത്തിലും ഇംഗ്ലീഷിലും സഹായിക്കാൻ കഴിയും. നിങ്ങൾക്ക് എന്ത് വിവരങ്ങൾ വേണം?'
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        type: messageType,
        documents: documents.length > 0 ? documents : undefined
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(input);
    setInput('');
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'search': return <Search className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <Avatar className="w-8 h-8 bg-metro-primary">
                  <AvatarFallback className="text-white text-xs">
                    {getMessageIcon(message.type)}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                <Card className={`${
                  message.sender === 'user' 
                    ? 'bg-metro-primary text-white border-metro-primary' 
                    : 'bg-white border-metro-primary/20'
                }`}>
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {message.documents && message.documents.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs font-medium opacity-75">Related Documents:</p>
                        {message.documents.map((doc, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="mr-2 mb-1 bg-metro-secondary text-metro-dark hover:bg-metro-secondary/80"
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs opacity-50 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {message.sender === 'user' && (
                <Avatar className="w-8 h-8 bg-gray-500">
                  <AvatarFallback className="text-white text-xs">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="w-8 h-8 bg-metro-primary">
                <AvatarFallback className="text-white text-xs">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white border-metro-primary/20">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-metro-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-metro-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-metro-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-metro-primary/20 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything in English or Malayalam... (e.g., 'സുരക്ഷാ നിയമങ്ങൾ', 'find operations manual')"
              className="flex-1 border-metro-primary/30 focus:border-metro-primary"
            />
            <Button 
              type="submit" 
              className="bg-metro-primary hover:bg-metro-accent text-white"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            I can help you search documents, answer questions, and provide information in both English and Malayalam
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;