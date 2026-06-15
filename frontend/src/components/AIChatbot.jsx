import React, { useState, useRef, useEffect } from 'react';
import { FaPlane, FaPaperPlane, FaTimes, FaWhatsapp, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'; // 👈 [THE FINAL IMMUNE FIX]: සයිට් එක ක්‍රෑෂ් කරන කිසිම වැරදි වචනයක් මෙතන නෑ!

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  const [messages, setMessages] = useState([
    { text: "**🇬🇧 English**\n👋 Welcome to Sri Lanka's first Aviation AI Chatbot! Ask me anything about flights, becoming a pilot, or SriLankan Airlines — I'll always answer in both English and Sinhala. ✈️🤖\n\n---\n\n**🇱🇰 සිංහල**\n👋 ආයුබෝවන්! ශ්‍රී ලංකාවේ ප්‍රථම Aviation AI Chatbot වෙත සාදරයෙන් පිළිගනිමු. ගුවන් ගමන්, පයිලට් කෙනෙක් වන ආකාරය හෝ SriLankan Airlines පිළිබඳ ඕනෑම දෙයක් දැන්ම මගෙන් අසන්න — මම හැමවිටම ඉංග්‍රීසි සහ සිංහල යන භාෂා දෙකෙන්ම පිළිතුරු දෙන්නම්! ✈️🤖", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef(null);
  
  const [isSinhalaInput, setIsSinhalaInput] = useState(true);

  const textAlerts = [
    "🇱🇰 ලංකාවේ පලවෙනි Aviation AI Chatbot සමඟ Chat කරන්න",
    "✈️ Ask me how to become a Pilot in Sri Lanka!",
    "🤖 SriLankan Airlines විස්තර දැන්ම මගෙන් අහන්න"
  ];
  const [currentTextIdx, setCurrentTextIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIdx((prev) => (prev + 1) % textAlerts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMarkdownToHTML = (text) => {
    if (!text) return "";
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\s*\*\s(.*)$/gim, '• $1')
      .replace(/^\s*---\s*$/gim, '<hr class="my-2.5 border-gray-200" />')
      .replace(/\n/g, '<br />');
    return formatted;
  };

  const checkIsSinhala = (text) => {
    const sinhalaRegex = /[\u0D80-\u0DFF]/;
    return sinhalaRegex.test(text);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setIsSinhalaInput(checkIsSinhala(userMessage));
    
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    
    setLoading(true);
    setProgress(5);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressIntervalRef.current);
          return 95;
        }
        return prev + 2;
      });
    }, 50);

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      
      setTimeout(() => {
        clearInterval(progressIntervalRef.current);
        setProgress(100);

        setTimeout(() => {
          setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
          setLoading(false);
          setProgress(0);
        }, 300);
      }, 1500);

    } catch (err) {
      clearInterval(progressIntervalRef.current);
      setLoading(false);
      setProgress(0);
      setMessages(prev => [...prev, { text: "**🇬🇧 English**\nSorry, I'm having trouble reaching the server. Please try again! 📡\n\n---\n\n**🇱🇰 සිංහල**\nකණගාටුයි, මගේ රේඩාර් පද්ධතියේ දෝෂයක් තියෙනවා. කරුණාකර නැවත උත්සාහ කරන්න! 📡", isBot: true }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      
      {/* 💬 TEXT BUBBLE */}
      {!isOpen && (
        <div className="mb-4 mr-2 bg-white text-gray-800 border border-blue-100 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl max-w-xs transition-all duration-500 animate-bounce relative after:content-[''] after:absolute after:bottom-[-6px] after:right-5 after:w-3 after:h-3 after:bg-white after:border-r after:border-b after:border-blue-100 after:rotate-45" style={{ animationDuration: '2.5s' }}>
          <span key={currentTextIdx} className="animate-pulse block text-center text-blue-600">
            {textAlerts[currentTextIdx]}
          </span>
        </div>
      )}

      {/* 🚀 BUTTONS CONTAINER */}
      {!isOpen && (
        <div className="flex flex-col items-center space-y-3 animate-bounce" style={{ animationDuration: '2.5s' }}>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 relative group"
            title="Chat with Flight Zone AI"
          >
            <FaPlane className="text-xl transform -rotate-45" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </button>

          <a 
            href="https://wa.me/94718953091" 
            target="_blank" 
            rel="noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 relative group"
            title="Contact via WhatsApp"
          >
            <FaWhatsapp className="text-2xl" />
            <span className="absolute right-14 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap shadow-md">
              Contact Admin
            </span>
          </a>
        </div>
      )}

      {/* 💬 INTERACTIVE CHAT BOX WINDOW */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 md:w-[440px] h-[480px] md:h-[580px] rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 animate-fade-in">
          
          {/* Header */}
          <div className="bg-blue-600 p-4 md:p-5 text-white flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10 shadow-inner">
                <FaPlane className="text-base transform -rotate-45" />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base tracking-wide">Flight Zone AI</h3>
                <p className="text-[10px] md:text-xs text-blue-200 font-medium">Aviation Co-Pilot Live</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition bg-white/10 hover:bg-white/20 p-2 rounded-full">
              <FaTimes size={14} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 md:p-5 overflow-y-auto space-y-4 bg-gray-50/50 relative">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                {msg.isBot ? (
                  <div className="max-w-[85%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed font-semibold shadow-sm bg-white text-gray-800 border rounded-tl-none border-gray-100 flex flex-col">
                    <div dangerouslySetInnerHTML={{ __html: formatMarkdownToHTML(msg.text) }} />
                    
                    {/* Social Media Links */}
                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center space-x-3 text-gray-400">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400/80">Follow FlightZone:</span>
                      <a href="https://web.facebook.com/Flightpicco" target="_blank" rel="noreferrer" className="text-[#1877F2] hover:scale-120 transition duration-200 text-sm md:text-base">
                        <FaFacebook />
                      </a>
                      <a href="https://www.instagram.com/flightzone_official/" target="_blank" rel="noreferrer" className="text-[#E4405F] hover:scale-120 transition duration-200 text-sm md:text-base">
                        <FaInstagram />
                      </a>
                      <a href="https://www.tiktok.com/@flightzone_official?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="text-[#000000] hover:scale-120 transition duration-200 text-sm md:text-base">
                        <FaTiktok />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[85%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed font-semibold shadow-sm bg-blue-600 text-white rounded-tr-none">
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

            {/* THE INTELLIGENT DUAL-LANGUAGE LOADING ANIMATION */}
            {loading && (
              <div className="flex justify-start w-full max-w-[85%] animate-fade-in">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm w-full space-y-4">
                  <div className="text-[11px] md:text-xs text-blue-600 font-bold leading-relaxed tracking-wide">
                    {isSinhalaInput ? (
                      "FlightZone AI ඔබ වෙනුවෙන් තොරතුරු සොයමින් පියාසර කරමින් සිටී... මොහොතක් ඉන්න... ✈️💨✨"
                    ) : (
                      "FLIGHTZONE AI IS FLYING TO RETRIEVE INFORMATION FOR YOU..... PLEASE WAIT A MOMENT...."
                    )}
                  </div>

                  <div className="relative w-full h-8 bg-gray-50/50 border border-dashed border-gray-100 rounded-xl overflow-hidden flex items-center">
                    <div className="h-full bg-gradient-to-r from-blue-50 to-blue-200/60 transition-all duration-500 ease-out border-r-2 border-dotted border-blue-300/80" style={{ width: `${progress}%` }}></div>
                    <div className="absolute flex items-center transition-all duration-500 ease-out" style={{ left: `calc(${progress}% - 20px)` }}>
                      <span className="h-1.5 w-1.5 bg-blue-300 rounded-full opacity-60 animate-ping mx-0.5"></span>
                      <span className="h-2 w-2 bg-blue-400 rounded-full opacity-40 animate-pulse mx-0.5"></span>
                      <FaPlane className="text-blue-600 text-base transform -rotate-45 ml-1 animate-bounce" style={{ animationDuration: '0.8s' }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out shadow-inner" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="flex justify-end text-[10px] text-blue-600 font-bold">
                      <span>{progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form Footer */}
          <form onSubmit={handleSendMessage} className="p-3.5 bg-white border-t flex space-x-2 items-center z-10">
            <input 
              type="text" 
              placeholder="Ask about flights, airports, piloting..." 
              className="flex-1 border border-gray-200 bg-gray-50 rounded-xl p-3 text-xs md:text-sm outline-none focus:border-blue-500 font-semibold text-gray-700 placeholder-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition shadow-md flex items-center justify-center">
              <FaPaperPlane size={14} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}