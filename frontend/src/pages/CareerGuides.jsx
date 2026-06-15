import React, { useState, useEffect } from 'react';
import { FaPlane, FaShieldAlt, FaUsers, FaSatelliteDish, FaBriefcase, FaCogs } from 'react-icons/fa';

// 💡 [ICON MAPPER]: බැක්එන්ඩ් එකෙන් අයිකන් එකේ නම ස්ට්‍රින්ග් (String) එකක් විදිහට ආවත් ක්‍රෑෂ් නොවී ලස්සනට පේන්න හදපු මැපර් එක
const iconComponents = {
  FaPlane: <FaPlane className="text-xl transform -rotate-45" />,
  FaCogs: <FaCogs className="text-xl" />,
  FaUsers: <FaUsers className="text-xl" />,
  FaSatelliteDish: <FaSatelliteDish className="text-lg" />,
  FaShieldAlt: <FaShieldAlt className="text-lg" />,
  FaBriefcase: <FaBriefcase className="text-lg" />
};

export default function CareerGuides() {
  const [mainCareers, setMainCareers] = useState([]);
  const [extraCareers, setExtraCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🇬🇧🇱🇰 [DEFAULT LANGUAGE FIX]: මුලින්ම සයිට් එක ලෝඩ් වෙද්දී Default ඉංග්‍රීසියෙන් පෙනෙන්න 'en' කළා මචං
  const [lang, setLang] = useState('en');

  // 📝 1. සර්වර් එකෙන් ඩේටා එනකන් පෙන්වන "උපරිම සවිස්තරාත්මක" ද්විභාෂා දත්ත (Main Careers)
  const defaultMainCareers = [
    {
      icon: "FaPlane",
      title: {
        si: "ගුවන් සමාගම් නියමුවෙකු (Airline Pilot) වන්නේ කෙසේද?",
        en: "How to become an Airline Pilot"
      },
      desc: {
        si: "වාණිජ මගී ප්‍රවාහන ජෙට් යානයක අණදෙන නිලධාරියා (Captain) වීමේ ගෞරවනීය ගමන ආරම්භ වන්නේ ශ්‍රී ලංකා සිවිල් ගුවන් සේවා අධිකාරිය (CAASL) මඟින් අනුමත 'Class 1' වෛද්‍ය සහතිකය ලබා ගැනීමෙනි. මේ සඳහා අයදුම්කරුවන්ට උසස් පෙළ (A/L) විභාගයෙන් භෞතික විද්‍යාව සහ ගණිතය අංශවලින් මූලික පසුබිමක් තිබීම අත්‍යවශ්‍ය වේ. ඔබට අනුමත ගුවන් නියමු පුහුණු ඇකඩමියකට ඇතුළත් වී ඒකාබද්ධ (Integrated ATPL) පාඨමාලාවක් හෝ මොඩියුලර් (Modular) ක්‍රමවේදයක් තෝරා ගත හැකිය. එහිදී ගුවන් නීතිය, කාලගුණ විද්‍යාව සහ මහා මාර්ග සංnavigationකරණය වැනි විෂයයන් 14කින් සමන්විත දරුණු න්‍යායාත්මක භූමි පාසල් (Ground School) විභාග සමත් විය යුතුය. ඊට සමගාමීව, තනි සහ බහු එන්ජින් සහිත ගුවන් යානාවල අවම වශයෙන් පැය 150 සිට 200 දක්වා සැබෑ පියාසර කාලයක් (Flight Hours) සම්පූර්ණ කර, උපකරණ ශ්‍රේණිගත කිරීම් (Instrument Rating - IR) සහිත වාණිජ ගුවන් නියමු බලපත්‍රය (CPL) ලබා ගත යුතුය. අවසාන පියවර ලෙස, ශ්‍රී ලංකන් ගුවන් සේවය වැනි වාණිජ ගුවන් සමාගමකට එකතු වීම සඳහා Airbus A320 හෝ Boeing 737 වැනි නිශ්චිත ගුවන් යානා මාදිලියක් සඳහා 'Type Rating' පාඨමාලාව සහ බහු-නියමු කාර්ය මණ්ඩල සම්බන්ධීකරණ (MCC) සහතිකය ලබා ගත යුතුය.",
        en: "Embark on the elite journey to command commercial jets. The path begins with obtaining a Class 1 Medical Certificate from the Civil Aviation Authority of Sri Lanka (CAASL). Candidates must possess a strong background in Physics and Mathematics at the A/Levels. You can choose between an Integrated Airline Transport Pilot License (ATPL) course or a Modular path at an approved flight training academy. The journey requires passing 14 rigorous theoretical ground school examinations covering subjects like General Navigation, Meteorology, and Air Law. Additionally, you must log a minimum of 150 to 200 hours of actual flight time on single-engine and multi-engine aircraft to secure your Commercial Pilot License (CPL) with Instrument Rating (IR). The final stepping stone to joining a commercial airline is completing a Type Rating course for a specific aircraft configuration, such as the Airbus A320 or Boeing 737 series, alongside a Multi-Crew Coordination (MCC) certification."
      }
    },
    {
      icon: "FaCogs",
      title: {
        si: "ගුවන් යානා නඩත්තු ඉංජිනේරුවෙකු (Aircraft Maintenance Engineer) වන්නේ කෙසේද?",
        en: "How to become an Aircraft Maintenance Engineer"
      },
      desc: {
        si: "ගුවන් ගමන් වල උපරිම ආරක්ෂාව සහ ගුවන් යානාවල පියාසර යෝග්‍යතාවය (Airworthiness) තහවුරු කරන穩 ප්‍රධානතම තාක්ෂණික භාරකරුවා වන්නේ ගුවන් යානා නඩත්තු ඉංජිනේරුවරයායි. මෙම ක්ෂේත්‍රයට පිවිසීම සඳහා ඔබ CAASL හෝ EASA Part 147 අනුමත ගුවන් යානා නඩත්තු ඉංජිනේරු පුහුණු ආයතනයක ලියාපදිංචි විය යුතුය. මෙම වෘත්තිය ප්‍රධාන බලපත්‍ර කාණ්ඩ දෙකකට බෙදේ: B1 (යාන්ත්‍රික - ගුවන් රාමු, ටර්බයින්/පිස්ටන් එන්ජින් සහ ව්‍යුහයන්) සහ B2 (Avionics - සංකීර්ණ විද්‍යුත් පද්ධති, උපකරණ, רේඩාර් සහ ස්වයංක්‍රීය පියාසර පද්ධති). මෙහිදී ගුවන් ගතික විද්‍යාව, ඩිජිටල් ශිල්පීය ක්‍රම සහ ද්‍රව්‍යමය දෘඩාංග ආවරණය වන පරිදි පුළුල් මොඩියුලර් විභාග මාලාවක් සමත් විය යුතුය. න්‍යායාත්මක දැනුමට අමතරව, සජීවී හැඟර් (Hangar) සහ ධාවන පථ නඩත්තු අංශ තුළ බලපත්‍රලාභී ඉංජිනේරුවන්ගේ සෘජු අධීක්ෂණය යටතේ වසර 2 සිට 4 දක්වා දැඩි ප්‍රායෝගික පුහුණුවක් (On-the-Job Training) ලබා ගනිමින් සහතික ලත් ලොග් පොතක් (Logbook) සම්පූර්ණ කිරීමෙන් පසු පූර්ණ AME බලපත්‍රය හිමිවේ.",
        en: "Become the ultimate guardian of flight safety and airworthiness. To enter this highly respected technical domain, you must enroll in a CAASL or EASA Part 147 approved Aircraft Maintenance Engineering training program. The profession is broadly split into specialized license categories: B1 (Mechanical - covering airframes, turbine/piston engines, and structures) and B2 (Avionics - focusing on complex electrical, instrumentation, radar, and autoflight systems). The academic journey involves clearing a series of comprehensive modular examinations mandated by aviation regulatory bodies, encompassing Aerodynamics, Digital Techniques, and Materials/Hardware. Parallel to theoretical knowledge, candidates must diligently build a certified Logbook by completing 2 to 4 years of intense, practical, on-the-job training (OJT) inside active line maintenance and base maintenance hangars under the strict mentorship of licensed engineers, eventually leading to a full AME License."
      }
    },
    {
      icon: "FaUsers",
      title: {
        si: "කැබින් ක්‍රෑව් නිලධාරියෙකු (Cabin Crew Executive) වන්නේ කෙසේද?",
        en: "How to become a Cabin Crew Executive"
      },
      desc: {
        si: "ගුවන් යානයක් තුළ ජාත්‍යන්තර මට්ටමේ ආගන්තුක සත්කාරය සහ මගීන්ගේ ආරක්ෂාව තහවුරු කරන ප්‍රධානතම තානාපතිවරුන් වන්නේ කැබින් ක්‍රෑව් (ගුවන් සේවක/සේවිකා) නිලධාරීන්ය. මෙම ගතික වෘත්තිය සඳහා අයදුම් කිරීමට, මූලික සුදුසුකම් ලෙස අපොස උසස් පෙළ (A/L) සමත්ව තිබීම, මනා පෞරුෂය සහ ඉංග්‍රීසි භාෂාව චතුර ලෙස හැසිරවීමේ හැකියාව අත්‍යවශ්‍ය වේ. හදිසි අවස්ථාවකදී ඉහළින් ඇති ආරක්ෂක උපකරණ සහ ජීවිතාරක්ෂක පීප්ප හැසිරවීම සඳහා නිශ්චිත ශාරීරික උසක් සහ අවම වශයෙන් සෙන්ටිමීටර 212ක අත් දිගක් (Arm Reach) තිබීම වැනි භෞතික පරාමිතීන් මෙහිදී පරීක්ෂා කෙරේ. ගුවන් සමාගමක් විසින් බඳවා ගැනීමෙන් පසු, තෝරාගත් අපේක්ෂකයින් සති 6 සිට 8 දක්වා දිවෙන දැඩි ආරක්ෂක සහ සේවා සහතික කිරීමේ පුහුණු කඳවුරකට ඇතුළත් කරනු ලැබේ. එහිදී හදිසි අවස්ථාවකදී ගුවන් යානයෙන් මගීන් ඉවත් කිරීම, ජලයට ගුවන් යානයක් හදිසියේ ගොඩබැස්වීමේ පියවර (Ditching), උසස් ප්‍රථමාධාර, ගුවන් සේවා ආරක්ෂණ උපක්‍රම, ගින්න නිවීම් සහ වාරික ගුවන් සේවා සත්කාරක ආචාර ධර්ම පිළිබඳව සවිස්තරාත්මක ප්‍රායෝගික පුහුණුවක් ලබා දේ.",
        en: "Serve as the paramount ambassador of global hospitality and passenger safety in the skies. To qualify for this dynamic operational career, candidates typically need a minimum of a high school qualification (GCE A/Levels in Sri Lanka), immaculate grooming standards, and a fluent, highly professional command of spoken and written English. Physical parameters are critical for safety operations: candidates must meet strict height requirements and a minimum arm-reach threshold (typically 212 cm) to easily operate high-mounted emergency overhead safety gear and exit rafts. Once recruited by an airline, selected candidates undergo an intensive 6-to-8 week initial safety and service certification program. This rigorous boot camp trains individuals in emergency cabin evacuations, ditching procedures, advanced first aid, aviation security, fire-fighting tactics, and premium inflight culinary service etiquette."
      }
    }
  ];

  // 📝 2. සර්වර් එකෙන් ඩේටා එනකන් පෙන්වන "උපරිම සවිස්තරාත්මක" ද්විභාෂා අතිරේක දත්ත (Extra Careers)
  const defaultExtraCareers = [
    {
      icon: "FaSatelliteDish",
      title: {
        si: "ගුවන් ගමන් පාලක (Air Traffic Controller - ATC)",
        en: "Air Traffic Controller (ATC)"
      },
      desc: {
        si: "ගුවන් කලාපය තුළ එකිනෙකට වෙනස් උසින් සහ වේගයෙන් පියාසර කරන සිය ගණනක් ගුවන් යානා එකිනෙක ගැටීම වළක්වමින්, ආරක්ෂිතව මෙහෙයවන අදෘශ්‍යමාන මාර්ගෝපදේශකයා වන්නේ මොවුන්ය. ATC නිලධාරියෙකු වීමට නම්, ඉහළ අවකාශීය අවබෝධයක්, ආතතිය යටතේ ක්ෂණික තීරණ ගැනීමේ හැකියාව සහ ගණිතය හා උසස් භෞතික විද්‍යාව පිළිබඳ ශක්තිමත් පදනමක් තිබිය යුතුය. අපේක්ෂකයින් මනෝවිද්‍යාත්මක පරීක්ෂණ සහ කටහඬ පැහැදිලිභාවය පිළිබඳ විගණනයන් ඇතුළු බහු-අදියර පරීක්ෂණවලින් සමත් විය යුතුය. විශේෂිත ගුවන් සේවා ඇකඩමිවල ලබා දෙන පුහුණුවට සංකීර්ණ රේඩාර් සිමියුලේටර් පාලනය, ජාත්‍යන්තර ගුවන් සේවා වාචක (Phraseology) සහ හදිසි ගුවන් මාර්ග හැසිරවීම් ඇතුළත් වේ.",
        en: "Act as the invisible guide orchestrating the movement of hundreds of aircraft safely through global airspaces. Becoming an ATC requires exceptional spatial awareness, flawless split-second decision-making under stress, and a solid foundation in mathematics and advanced physics. Candidates undergo comprehensive multi-tier testing, including psychometric testing and voice articulation audits. Training at specialized aviation academies consists of rigorous radar simulation controls, complex aerodrome control procedures, international phraseology, airspace partitioning protocols, and emergency routing vectors."
      }
    },
    {
      icon: "FaShieldAlt",
      title: {
        si: "Flight Dispatcher",
        en: "Flight Dispatcher & Operations"
      },
      desc: {
        si: "සෑම වාණිජ ගුවන් ගමනක්ම පිටුපස සිටින ප්‍රධාන මෙහෙයුම් මොළය Flight Dispatcher වරයායි. ගුවන් ගමනක ආරක්ෂාව පිළිබඳව ගුවන් යානයේ කපිතාන්වරයාට සමාන නීතිමය වගකීමක් මොවුන් සතු වේ. ඔවුන් ගුවන් ගමන් මෙහෙයුම් පාලන මධ්‍යස්ථාන තුළ සිට ගුවන් යානයේ බර අනුව අවශ්‍ය ප්‍රශස්ත ඉන්ධන ප්‍රමාණය ගණනය කිරීම, ගෝලීය කාලගුණ සිතියම් විශ්ලේෂණය කිරීම, NOTAM (ගුවන් නියමුවන්ට දෙන විශේෂ නිවේදන) ඇගයීම සහ භූදේශපාලනික ගුවන් කලාප වසා දැමීම් නිරීක්ෂණය කර නිල ගුවන් ගමන් සැලසුම් (Flight Plans) සකස් කරයි. මේ සඳහා CAASL හෝ FAA අනුමත බලපත්‍රයක් අවශ්‍ය වේ.",
        en: "The critical operational brains executing behind every single commercial flight path. Flight Dispatchers share equal legal responsibility with the Aircraft Commander (Captain) for the safety of a flight. They work meticulously in operations control centers to compute optimal fuel requirements based on payload, study real-time global meteorological weather charts, evaluate Notice to Air Missions (NOTAMs), and navigate geopolitical airspace closures. Entering this field requires a specialized CAASL or FAA-approved Flight Dispatcher License course followed by extensive practical flight watch training."
      }
    },
    {
      icon: "FaBriefcase",
      title: {
        si: "ගුවන් සේවා කළමනාකරණය සහ ලොජිස්ටික්ස්",
        en: "Aviation Management & Logistics"
      },
      desc: {
        si: "ගෝලීය ගුවන් සේවා ආර්ථිකය මෙහෙයවන සංකීර්ණ ආයතනික සහ ව්‍යාපාරික පද්ධතිය පාලනය කරන්නේ මෙම අංශයයි. මෙම වෘත්තීය ක්ෂේත්‍රය ගුවන් තොටුපළ බිම් හැසිරවීමේ ජාල (Ground Handling), ගුවන් සමාගම්වල ගුවන් මාර්ග ලාභදායීතා කාලසටහන්කරණය, ගෝලීය ගුවන් භාණ්ඩ ප්‍රවාහන (Air Cargo) පර්යන්ත මෙහෙයුම්, ගුවන් යානා ඉන්ධන සැපයුම් දාමයන් සහ ආරක්ෂණ කළමනාකරණ පද්ධති (SMS) පුරා විහිද පවතී. ගුවන් සේවා කළමනාකරණය, සැපයුම් දාම ලොජිස්ටික්ස් හෝ ජාත්‍යන්තර ප්‍රවාහන ආර්ථික විද්‍යාව පිළිබඳ විශ්වවිද්‍යාල උපාධියක් හෝ වෘත්තීය ඩිප්ලෝමාවක් ඇති අයට වඩාත්ම සුදුසු වෘත්තීය මාවතකි.",
        en: "Govern the complex corporate and business ecosystems driving the global aviation economy. This career trajectory spans across airport ground handling networks, airline route profitability scheduling, global air cargo terminal logistics, aviation fuel supply chains, and safety management systems (SMS). This path is ideally suited for ambitious professionals holding a University Degree or specialized postgraduate professional diplomas in Aviation Management, Supply Chain Logistics, or International Transport Economics."
      }
    }
  ];

  useEffect(() => {
    fetch('http://localhost:5000/api/careers')
      .then(res => res.json())
      .then(data => {
        const main = data.filter(c => c.category === 'main');
        const extra = data.filter(c => c.category === 'extra');
        
        setMainCareers(main.length ? main : defaultMainCareers);
        setExtraCareers(extra.length ? extra : defaultExtraCareers);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching careers, loading fallback data:", err);
        setMainCareers(defaultMainCareers);
        setExtraCareers(defaultExtraCareers);
        setLoading(false);
      });
  }, []);

  const renderIcon = (iconName, fallbackIcon) => {
    if (typeof iconName === 'string') {
      return iconComponents[iconName] || fallbackIcon;
    }
    return iconName || fallbackIcon;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <FaPlane className="absolute text-blue-600 text-xl animate-pulse transform -rotate-45" />
        </div>
        <p className="mt-4 font-black text-slate-500 tracking-widest text-xs animate-pulse">
          {lang === 'si' ? 'ගුවන් සේවා දත්ත පූරණය වෙමින් පවතී... 🛰️' : 'LOADING CAREER BEACONS... 🛰️'}
        </p>
      </div>
    );
  }

  const uiTexts = {
    title: { si: "Aviation Career Blueprints", en: "Aviation Career Blueprints" },
    subtitle: { 
      si: "ගෝලීය වාණිජ ගුවන් සේවා ක්ෂේත්‍රය තුළ ඔබේ සිහින වෘත්තීය මාවත සාර්ථකව ජය ගැනීම සඳහා අවශ්‍ය ව්‍යුහගත මාර්ග සිතියම්, ජාත්‍යන්තර බලපත්‍ර අවශ්‍යතා සහ පුහුණු පියවර මෙතැනින් ලබාගන්න.",
      en: "Discover deeply structured, highly authoritative roadmaps, international licensing requirements, and training steps to navigate your elite career paths within commercial aviation infrastructure."
    },
    extraTitle: { si: "Other Aviation Horizons", en: "Other Aviation Horizons" },
    extraSubtitle: {
      si: "ගුවන් ගමන් ආරක්ෂණ පද්ධති, මෙහෙයුම් පාලන කුටි සහ වාණිජ කළමනාකරණ ලොජිස්ටික්ස් පාලනය කරන අනෙකුත් සුවිශේෂී වෘත්තීය ක්ෂේත්‍රයන් පිළිබඳව ගවේෂණය කරන්න.",
      en: "Explore secondary highly specialized operational pathways governing air safety networks, dispatch control rooms, and commercial management logistics assets."
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 px-4 md:px-8 font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* 🌍 LANGUAGES SWITCHER TOGGLE BUTTON BAR */}
        <div className="flex justify-end mb-8">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200/80 flex space-x-1 items-center">
            <button 
              onClick={() => setLang('si')} 
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold tracking-wide transition-all duration-200 flex items-center space-x-1.5 ${lang === 'si' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span>🇱🇰</span> <span>සිංහල</span>
            </button>
            <button 
              onClick={() => setLang('en')} 
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold tracking-wide transition-all duration-200 flex items-center space-x-1.5 ${lang === 'en' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span>🇬🇧</span> <span>English</span>
            </button>
          </div>
        </div>

        {/* ✈️ TITLE SECTION */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 text-blue-600/5 text-8xl font-black select-none tracking-widest uppercase hidden md:block">
            Aviation
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
            {uiTexts.title[lang].split(' ')[0]} {uiTexts.title[lang].split(' ')[1]} <span className="text-blue-600">{uiTexts.title[lang].split(' ')[2]}</span>
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 max-w-3xl mx-auto text-sm md:text-base leading-relaxed font-semibold">
            {uiTexts.subtitle[lang]}
          </p>
        </div>

        {/* 🚀 TOP MAIN CAREERS (PREMIUM DETAILED CARD LIST) */}
        <div className="space-y-8 mb-24">
          {mainCareers.map((career, i) => (
            <div 
              key={i} 
              className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col md:flex-row md:items-start md:space-x-8"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-600 group-hover:bg-gradient-to-b group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300"></div>
              
              <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white rounded-2xl flex items-center justify-center shadow-inner transition-all duration-300 mb-6 md:mb-0 shrink-0">
                {renderIcon(career.icon, <FaPlane />)}
              </div>

              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mb-4 tracking-tight">
                  {typeof career.title === 'object' ? career.title[lang] : career.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-xs md:text-sm md:text-[14px] font-medium text-justify">
                  {typeof career.desc === 'object' ? career.desc[lang] : career.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🌐 BOTTOM EXTRA CAREERS (MODERN DETAILED GRID STYLE) */}
        <div className="border-t border-slate-200/60 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
              {uiTexts.extraTitle[lang].split(' ')[0]} <span className="text-blue-600">{uiTexts.extraTitle[lang].slice(uiTexts.extraTitle[lang].indexOf(' ') + 1)}</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium mt-2 max-w-xl mx-auto">
              {uiTexts.extraSubtitle[lang]}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {extraCareers.map((career, i) => (
              <div 
                key={i} 
                className="bg-white p-7 md:p-8 rounded-3xl border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 bg-slate-50 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors duration-300 shrink-0">
                    {renderIcon(career.icon, <FaBriefcase />)}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mb-4 tracking-tight">
                    {typeof career.title === 'object' ? career.title[lang] : career.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium text-justify">
                    {typeof career.desc === 'object' ? career.desc[lang] : career.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}