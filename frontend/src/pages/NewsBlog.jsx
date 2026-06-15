import React, { useEffect, useState } from 'react';
import { FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

export default function NewsBlog() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // all, srilanka

  useEffect(() => {
    // 📡 බැක්එන්ඩ් එකෙන් එන සේරම නිව්ස් 50ම (Google News RSS + Local Backup) ඇදලා ගන්නවා
    fetch('https://flight-zone-official.vercel.app/api/aviation-news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formattedNews = data.map((item, index) => {
            const titleText = item.title || "";
            
            // 🧠 ටයිටල් එකේ ලංකාවේ වචනයක් තිබ්බොත් ඔටෝම Sri Lanka ටැග් එක වදිනවා
            const isSriLankan = 
              titleText.toLowerCase().includes('sri lanka') || 
              titleText.toLowerCase().includes('srilankan') || 
              titleText.toLowerCase().includes('colombo') ||
              titleText.toLowerCase().includes('katunayake');

            return {
              // ⚡ Vite එකේ unique key ප්‍රශ්න නොවෙන්න API id එකක් නැත්නම් index එක පූට්ටු කරනවා
              id: item.id || `news-${index}`, 
              title: titleText,
              summary: item.description || "Click Read Full Coverage to view the complete article on the official news site.", 
              news_site: item.source || "Aviation Stream",     
              image_url: item.image_url || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600",
              url: item.url || "#",
              isSL: isSriLankan
            };
          });

          // 🧠 මෙතන කිසිම සලයිස් (.slice) එකක් නැහැ, බැක්එන්ඩ් එකෙන් එන ඔක්කොම සෙට් කරනවා!
          setNews(formattedNews);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching live news from backend:", err);
        setLoading(false);
      });
  }, []);

  const filteredNews = news.filter(item => {
    if (activeTab === 'srilanka') return item.isSL === true;
    return true; 
  });

  const sriLankaNewsCount = news.filter(item => item.isSL).length;

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 font-sans select-none">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-2 tracking-tight">Live Aviation Industry News</h1>
        <p className="text-gray-500 text-center mb-10 text-sm md:text-base">Real-time global aerospace updates, market analysis, and live trending articles directly from global aviation sources.</p>

        {/* TABS CONTROLS */}
        <div className="flex bg-gray-200/70 p-1.5 rounded-2xl max-w-sm mx-auto mb-12 border border-gray-200">
          <button 
            onClick={() => setActiveTab('all')}
            className={`flex items-center justify-center space-x-2 w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 ${activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <FaGlobe />
            <span>All Updates ({news.length})</span>
          </button>
          <button 
            onClick={() => setActiveTab('srilanka')}
            className={`flex items-center justify-center space-x-2 w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 ${activeTab === 'srilanka' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <FaMapMarkerAlt className="text-red-500" />
            <span>Sri Lanka News ({sriLankaNewsCount})</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 font-bold text-gray-400 animate-pulse text-sm">Loading Latest Aviation News... 📡</div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 font-bold text-gray-400 text-sm">No live news streams found right now. ✈️</div>
        ) : (
          /* 🧠 සේරම නිව්ස් 50ම කිසිම ලිමිට් එකක් නැතුව grid එකට මැප් වෙනවා */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredNews.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-48 bg-slate-100">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    {item.isSL && (
                      <span className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center space-x-1 shadow-sm">
                        <FaMapMarkerAlt /> <span>Sri Lanka</span>
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">{item.news_site}</span>
                    <h3 className="text-base font-bold text-gray-900 mt-3 line-clamp-2 leading-snug">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed font-medium">{item.summary}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a href={item.url} target="_blank" rel="noreferrer" className="inline-block text-center w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs py-3 rounded-xl transition">Read Full Coverage</a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Email Submission CTA Banner */}
        <div className="bg-blue-600 text-white p-8 md:p-12 rounded-3xl text-center shadow-xl shadow-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Are you an Aviation Enthusiast?</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-6 text-sm">Share your expertise, knowledge, and flight line stories directly with our massive community.</p>
          <div className="inline-block bg-white text-blue-600 font-mono font-bold px-6 py-3 rounded-xl shadow-inner select-all text-sm md:text-base">
            Blueskynetworks1@gmail.com
          </div>
          <p className="text-xs text-blue-200 mt-3 font-semibold">Submit your draft via email to be featured on Flight Zone!</p>
        </div>

      </div>
    </div>
  );
}