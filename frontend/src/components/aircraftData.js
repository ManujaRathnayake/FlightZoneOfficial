export const aircraftData = [
  // ✈️ --- COMMERCIAL: AIRBUS ---
  {
    name: "Airbus A350-1000",
    type: "commercial",
    manufacturer: "Airbus",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505054/Airbus_A350-1000_202606151149_uopdzv.jpg",
    description: "The largest variant of the A350 family, featuring advanced aerodynamics and carbon-fiber fuselage for long-haul routes.",
    specs: { range: "16,100 km", capacity: "350 - 410 seats", engines: "Rolls-Royce Trent XWB", wingspan: "64.75 m" }
  },
  {
    name: "Airbus A330-900neo",
    type: "commercial",
    manufacturer: "Airbus",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505051/Airbus_A330-900neo_202606151149_p6uga3.jpg",
    description: "A new generation wide-body aircraft delivering state-of-the-art efficiency, widely used by SriLankan Airlines.",
    specs: { range: "13,334 km", capacity: "260 - 300 seats", engines: "Rolls-Royce Trent 7000", wingspan: "64 m" }
  },
  {
    name: "Airbus A321neo",
    type: "commercial",
    manufacturer: "Airbus",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505044/Airbus_A321neo_202606151149_agkcli.jpg",
    description: "The longest-fuselage member of Airbus' single-aisle A320 family, offering exceptional eco-efficiency.",
    specs: { range: "7,400 km", capacity: "180 - 244 seats", engines: "CFM LEAP-1A / PW1100G", wingspan: "35.8 m" }
  },
  {
    name: "Airbus A380-800",
    type: "commercial",
    manufacturer: "Airbus",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505037/Airbus_A380-800_202606151149_przysw.jpg",
    description: "The world's largest passenger airliner. A double-deck widebody that redefined long-haul luxury hub-to-hub travel.",
    specs: { range: "15,200 km", capacity: "525 - 853 seats", engines: "EA GP7200 / RR Trent 900", wingspan: "79.75 m" }
  },
  {
    name: "Airbus A220-300",
    type: "commercial",
    manufacturer: "Airbus",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505031/Airbus_A220-300_202606151149_p6djaq.jpg",
    description: "Originally Bombardier CSeries, built for the 100-150 seat market with clean-sheet aerodynamics.",
    specs: { range: "6,297 km", capacity: "120 - 160 seats", engines: "Pratt & Whitney PW1500G", wingspan: "35.1 m" }
  },
  {
    name: "Airbus A340-300",
    type: "commercial",
    manufacturer: "Airbus",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505040/Airbus_A340-300_202606151149_qnrx6o.jpg",
    description: "A classic four-engine widebody long-range airliner, previously a prominent part of Air Lanka / SriLankan history.",
    specs: { range: "13,500 km", capacity: "295 seats", engines: "CFM International CFM56-5C", wingspan: "60.3 m" }
  },
  {
    name: "Airbus A319neo",
    type: "commercial",
    manufacturer: "Airbus",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505045/Airbus_A319neo_202606151149_eiwukz.jpg",
    description: "The smallest member of the A320neo family, tailored for high-altitude airports and thin hot routes.",
    specs: { range: "6,850 km", capacity: "124 - 160 seats", engines: "CFM LEAP-1A / PW1100G", wingspan: "35.8 m" }
  },
  {
    name: "Airbus A300-600",
    type: "commercial",
    manufacturer: "Airbus",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505031/Airbus_A300-600_202606151149_pcgz0i.jpg",
    description: "The world's first twin-engine wide-body airliner, pioneered twin-jet transoceanic flight configurations.",
    specs: { range: "7,540 km", capacity: "250 - 345 seats", engines: "GE CF6 / PW4000", wingspan: "44.8 m" }
  },

  // ✈️ --- COMMERCIAL: BOEING ---
  {
    name: "Boeing 777-9X",
    type: "commercial",
    manufacturer: "Boeing",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505045/Boeing_777-9X_202606151149_uijfkg.jpg",
    description: "Boeing's newest flagship widebody featuring innovative folding composite wingtips and massive GE9X powerplants.",
    specs: { range: "13,500 km", capacity: "426 seats", engines: "General Electric GE9X", wingspan: "71.8 m (64.8 m folded)" }
  },
  {
    name: "Boeing 787-9 Dreamliner",
    type: "commercial",
    manufacturer: "Boeing",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505016/Boeing_787-9_Dreamliner_202606151149_v3tghi.jpg",
    description: "Constructed mainly of composite carbon-fiber materials, optimizing fuel burns and cabin pressurization levels.",
    specs: { range: "14,140 km", capacity: "296 seats", engines: "GEnx-1B / RR Trent 1000", wingspan: "60 m" }
  },
  {
    name: "Boeing 737 MAX 8",
    type: "commercial",
    manufacturer: "Boeing",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781505016/Boeing_737_MAX_8_202606151149_map7x0.jpg",
    description: "The advanced generation of the single-aisle short-to-medium haul industry workhorse.",
    specs: { range: "6,570 km", capacity: "162 - 210 seats", engines: "CFM International LEAP-1B", wingspan: "35.9 m" }
  },
  {
    name: "Boeing 747-8 Intercontinental",
    type: "commercial",
    manufacturer: "Boeing",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504964/Boeing_747-8_Intercontinental_202606151149_fynku7.jpg",
    description: "The Queen of the Skies. The ultimate evolution of the legendary four-engine hump-profile jetliner.",
    specs: { range: "14,320 km", capacity: "410 - 467 seats", engines: "GEnx-2B67", wingspan: "68.4 m" }
  },
  {
    name: "Boeing 777-300ER",
    type: "commercial",
    manufacturer: "Boeing",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504975/Boeing_777-300ER_202606151149_p8eryg.jpg",
    description: "The world's most successful twin-engine long-range widebody airliner, powered by the legendary GE90 engines.",
    specs: { range: "13,649 km", capacity: "396 seats", engines: "General Electric GE90-115B", wingspan: "64.8 m" }
  },
  {
    name: "Boeing 757-200",
    type: "commercial",
    manufacturer: "Boeing",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504978/Boeing_757-200_202606151149_yzkmef.jpg",
    description: "Known as the rocket of the skies due to its exceptional power-to-weight performance on short runways.",
    specs: { range: "7,250 km", capacity: "200 - 239 seats", engines: "Rolls-Royce RB211 / PW2000", wingspan: "38.0 m" }
  },
  {
    name: "Boeing 727-200",
    type: "commercial",
    manufacturer: "Boeing",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504982/Boeing_727-200_202606151149_ekg5ai.jpg",
    description: "Classic tri-jet short-to-medium haul airliner with a distinctive T-tail configuration from the golden era.",
    specs: { range: "4,450 km", capacity: "163 - 189 seats", engines: "Pratt & Whitney JT8D", wingspan: "32.9 m" }
  },

  // ✈️ --- COMMERCIAL: OTHER MANUFACTURERS ---
  {
    name: "Embraer E195-E2",
    type: "commercial",
    manufacturer: "Embraer",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504965/Embraer_E195-E2_202606151149_ezdxqa.jpg",
    description: "The 'Profit Hunter'. Brazil's premier ultra-efficient regional crossover jetliner utilizing GTF engine designs.",
    specs: { range: "4,815 km", capacity: "120 - 146 seats", engines: "Pratt & Whitney PW1900G", wingspan: "35.1 m" }
  },
  {
    name: "Bombardier CRJ-900",
    type: "commercial",
    manufacturer: "Bombardier",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504966/Bombardier_CRJ-900_202606151149_phjbwb.jpg",
    description: "Regional jet designed for high-frequency short-haul hub-feeder routes, popular in North America.",
    specs: { range: "2,876 km", capacity: "76 - 90 seats", engines: "GE CF34-8C5", wingspan: "24.9 m" }
  },
  {
    name: "ATR 72-600",
    type: "commercial",
    manufacturer: "ATR",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504969/ATR_72-600_202606151149_sjm9ov.jpg",
    description: "The world's leading regional turboprop aircraft. Highly efficient, widely operated across Sri Lanka (FitsAir / Cynos).",
    specs: { range: "1,370 km", capacity: "44 - 78 seats", engines: "Pratt & Whitney PW127XT", wingspan: "27.05 m" }
  },
  {
    name: "ATR 42-600",
    type: "commercial",
    manufacturer: "ATR",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504965/ATR_42-600_202606151149_oodghh.jpg",
    description: "Shorter twin-turboprop variant optimized for short regional airfields and island-hopping sectors.",
    specs: { range: "1,326 km", capacity: "30 - 50 seats", engines: "Pratt & Whitney PW127M", wingspan: "24.57 m" }
  },
  {
    name: "Concorde",
    type: "commercial",
    manufacturer: "Aerospatiale / BAC",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504941/Concorde_202606151149_aiqolv.jpg",
    description: "The legendary supersonic passenger transport that cruised at twice the speed of sound (Mach 2.04).",
    specs: { range: "7,222 km", capacity: "92 - 128 seats", engines: "Rolls-Royce/Snecma Olympus 593", wingspan: "25.6 m" }
  },
  {
    name: "McDonnell Douglas MD-80",
    type: "commercial",
    manufacturer: "McDonnell Douglas",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504926/McDonnell_Douglas_MD-80_202606151150_mpk76w.jpg",
    description: "Iconic T-tail twin-rear-engine narrowbody jetliner affectionately referred to as the 'Mad Dog'.",
    specs: { range: "3,800 km", capacity: "130 - 172 seats", engines: "Pratt & Whitney JT8D-200", wingspan: "32.8 m" }
  },
  {
    name: "McDonnell Douglas DC-10",
    type: "commercial",
    manufacturer: "McDonnell Douglas",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504923/McDonnell_Douglas_DC-10_202606151150_xqqcrs.jpg",
    description: "Classic widebody tri-jet airliner with a distinctive center engine tunnel integration inside the vertical tail.",
    specs: { range: "9,600 km", capacity: "250 - 380 seats", engines: "GE CF6-50 / PW JT9D", wingspan: "50.4 m" }
  },
  {
    name: "Cessna 208 Caravan",
    type: "commercial",
    manufacturer: "Cessna",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504946/Cessna_208_Caravan_202606151150_lxwfly.jpg",
    description: "A rugged single-engine turboprop utility aircraft, heavily used for domestic flights and safaris in Sri Lanka.",
    specs: { range: "1,982 km", capacity: "9 - 14 seats", engines: "Pratt & Whitney PT6A-114A", wingspan: "15.85 m" }
  },
  {
    name: "De Havilland Canada Dash 8-Q400",
    type: "commercial",
    manufacturer: "De Havilland",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504944/De_Havilland_Canada_Dash_8-Q400_202606151150_xnhttg.jpg",
    description: "Advanced turboprop airliner featuring an active noise and vibration suppression system for passenger comfort.",
    specs: { range: "2,040 km", capacity: "74 - 90 seats", engines: "Pratt & Whitney PW150A", wingspan: "28.4 m" }
  },
  {
    name: "Sukhoi Superjet 100",
    type: "commercial",
    manufacturer: "Sukhoi",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504942/Sukhoi_Superjet_100_202606151150_txvrse.jpg",
    description: "A modern Russian regional jet developed to compete globally in the lower capacity regional airline market.",
    specs: { range: "3,048 km", capacity: "87 - 108 seats", engines: "PowerJet SaM146", wingspan: "27.8 m" }
  },
  {
    name: "Comac C919",
    type: "commercial",
    manufacturer: "COMAC",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504802/Comac_C919_202606151150_dh1zmc.jpg",
    description: "China's home-grown single-aisle narrowbody trunk jetliner designed to challenge the A320 and 737 duopoly.",
    specs: { range: "4,075 km", capacity: "158 - 192 seats", engines: "CFM International LEAP-1C", wingspan: "35.8 m" }
  },
  {
    name: "Antonov An-225 Mriya",
    type: "commercial",
    manufacturer: "Antonov",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504818/Antonov_An-225_Mriya_202606151150_cghdej.jpg",
    description: "The heaviest aircraft ever built, powered by six turbofan engines. A legendary strategic heavy-lift cargo asset.",
    specs: { range: "15,400 km", capacity: "250,000 kg cargo", engines: "Progress D-18T (x6)", wingspan: "88.4 m" }
  },
  {
    name: "Antonov An-124 Ruslan",
    type: "commercial",
    manufacturer: "Antonov",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504807/Antonov_An-124_Ruslan_202606151150_dxai88.jpg",
    description: "Large four-engine strategic airlifter, frequently spotted operating heavy charter freight missions globally.",
    specs: { range: "3,700 km", capacity: "150,000 kg cargo", engines: "Progress D-18T (x4)", wingspan: "73.3 m" }
  },
  {
    name: "Ilyushin Il-96",
    type: "commercial",
    manufacturer: "Ilyushin",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504818/Ilyushin_Il-96_202606151150_vnysro.jpg",
    description: "Russian four-engine widebody long-haul airliner, primarily serves as the Russian presidential transport fleet.",
    specs: { range: "11,500 km", capacity: "237 - 436 seats", engines: "Aviadvigatel PS-90A", wingspan: "60.11 m" }
  },
  {
    name: "Vickers VC10",
    type: "commercial",
    manufacturer: "Vickers-Armstrongs",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504932/Vickers_VC10_202606151150_ngalr0.jpg",
    description: "Classic British quad-rear-engine airliner, built for hot-and-high conditions, historic in early Air Ceylon/Air Lanka codes.",
    specs: { range: "9,410 km", capacity: "151 seats", engines: "Rolls-Royce Conway", wingspan: "44.5 m" }
  },
  {
    name: "Lockheed L-1011 TriStar",
    type: "commercial",
    manufacturer: "Lockheed",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504786/Lockheed_L-1011_TriStar_202606151150_ab8a6y.jpg",
    description: "Highly advanced widebody tri-jet airliner. This iconic aircraft formed the historical foundation of Air Lanka's premier long-haul routes.",
    specs: { range: "7,410 km", capacity: "256 - 400 seats", engines: "Rolls-Royce RB211", wingspan: "47.3 m" }
  },

  // 🛡️ --- MILITARY AIRCRAFTS ---
  {
    name: "Lockheed Martin F-35 Lightning II",
    type: "military",
    manufacturer: "Lockheed Martin",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504790/Lockheed_Martin_F-35_Lightning_II_202606151150_eocwhg.jpg",
    description: "A 5th Generation stealth multirole combat fighter equipped with cutting-edge sensor fusion technology.",
    specs: { topSpeed: "Mach 1.6", range: "2,800 km", type: "Stealth Multirole Fighter", payload: "18,000 lbs capacity" }
  },
  {
    name: "Sukhoi Su-57 Felon",
    type: "military",
    manufacturer: "Sukhoi",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504794/Sukhoi_Su-57_Felon_202606151150_ehy7yx.jpg",
    description: "Twin-engine fifth-generation supermaneuverable stealth fighter jet optimized for total air superiority operations.",
    specs: { topSpeed: "Mach 2.0", range: "3,500 km", type: "Stealth Air Superiority", payload: "Internal weapons bays" }
  },
  {
    name: "Eurofighter Typhoon",
    type: "military",
    manufacturer: "Eurofighter",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504820/Eurofighter_Typhoon_202606151150_pui13j.jpg",
    description: "A highly agile foreplane/delta-wing twin-engine multirole combat aircraft trusted across NATO airforces.",
    specs: { topSpeed: "Mach 2.0", range: "2,900 km", type: "Multirole Fighter Jet", payload: "13 weapon hardpoints" }
  },
  {
    name: "Lockheed Martin F-22 Raptor",
    type: "military",
    manufacturer: "Lockheed Martin",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504703/Lockheed_Martin_F-22_Raptor_202606151150_ybbfxl.jpg",
    description: "The world's premier 5th generation air-dominance fighter combining stealth, supercruise, and thrust-vectoring agility.",
    specs: { topSpeed: "Mach 2.25", range: "3,000 km", type: "Air Dominance Fighter", payload: "Internal AIM-120 / AIM-9 bays" }
  },
  {
    name: "Boeing F/A-18E/F Super Hornet",
    type: "military",
    manufacturer: "Boeing",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504697/Boeing_F_A-18E_F_Super_Hornet_202606151150_iufqzs.jpg",
    description: "Carrier-capable multirole fighter aircraft, the backbone of the United States Navy strike fleet power.",
    specs: { topSpeed: "Mach 1.6", range: "2,346 km", type: "Carrier Strike Fighter", payload: "17,750 lbs external capacity" }
  },
  {
    name: "McDonnell Douglas F-15E Strike Eagle",
    type: "military",
    manufacturer: "McDonnell Douglas",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504784/McDonnell_Douglas_F-15E_Strike_E__202606151150_ve4jgk.jpg",
    description: "All-weather twin-engine strike fighter engineered to execute deep interdiction missions at high speeds.",
    specs: { topSpeed: "Mach 2.5", range: "3,900 km", type: "Dual-Role Strike Fighter", payload: "23,000 lbs weapon limit" }
  },
  {
    name: "General Dynamics F-16 Fighting Falcon",
    type: "military",
    manufacturer: "General Dynamics",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504809/General_Dynamics_F-16_Fighting_F__202606151150_fkca6d.jpg",
    description: "Highly successful single-engine supersonic multirole fighter jet, operated globally by over 25 countries.",
    specs: { topSpeed: "Mach 2.0", range: "4,220 km", type: "Multirole Combat Aircraft", payload: "9 weapon hardpoints" }
  },
  {
    name: "Dassault Rafale",
    type: "military",
    manufacturer: "Dassault Aviation",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504789/Dassault_Rafale_202606151150_noyjhb.jpg",
    description: "French twin-engine delta-wing 'omnirole' combat aircraft capable of carrying out atomic strike missions.",
    specs: { topSpeed: "Mach 1.8", range: "3,700 km", type: "Omnirole Fighter Jet", payload: "14 weapon hardpoints" }
  },
  {
    name: "Saab JAS 39 Gripen",
    type: "military",
    manufacturer: "Saab",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504686/Saab_JAS_39_Gripen_202606151151_vuefdq.jpg",
    description: "Lightweight single-engine multirole fighter jet renowned for its low operational costs and short-runway utility.",
    specs: { topSpeed: "Mach 2.0", range: "3,200 km", type: "Multirole Combat Jet", payload: "11,700 lbs weapon load" }
  },
  {
    name: "Sukhoi Su-35 Flanker-E",
    type: "military",
    manufacturer: "Sukhoi",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504697/Sukhoi_Su-35_Flanker-E_202606151150_o1ftic.jpg",
    description: "Heavy-class Russian air-superiority fighter utilizing advanced thrust-vectoring nozzles for extreme aerobatic agility.",
    specs: { topSpeed: "Mach 2.25", range: "3,600 km", type: "Air Superiority Heavy Fighter", payload: "12 wing/fuselage hardpoints" }
  },
  {
    name: "Mikoyan MiG-29 Fulcrum",
    type: "military",
    manufacturer: "Mikoyan",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504644/Lockheed_SR-71_Blackbird_USA_202606151151_q1qnpv.jpg", // SR-71 සෙට් කළා මචං
    description: "Classic twin-engine air superiority fighter jet developed in the Soviet era to counter modern Western jets.",
    specs: { topSpeed: "Mach 2.25", range: "1,430 km", type: "Air Superiority Jet", payload: "6 underwing hardpoints" }
  },
  {
    name: "Chengdu J-20 Mighty Dragon",
    type: "military",
    manufacturer: "Chengdu",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504696/Chengdu_J-20_Mighty_Dragon_202606151150_dx1uc1.jpg",
    description: "China's advanced twin-engine fifth-generation heavy stealth air-superiority fighter asset.",
    specs: { topSpeed: "Mach 2.0", range: "6,000 km", type: "Stealth Air Superiority Fighter", payload: "Internal weapons bay setup" }
  },
  {
    name: "Northrop Grumman B-2 Spirit",
    type: "military",
    manufacturer: "Northrop Grumman",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504640/Northrop_Grumman_B-2_Spirit_202606151151_hh27g9.jpg",
    description: "Strategic stealth heavy penetration flying-wing bomber capable of delivering both nuclear and conventional munitions.",
    specs: { topSpeed: "High Subsonic", range: "11,100 km", type: "Heavy Stealth Bomber", payload: "40,000 lbs nuclear/smart bombs" }
  },
  {
    name: "Rockwell B-1 Lancer",
    type: "military",
    manufacturer: "Rockwell",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504634/Rockwell_B-1_Lancer__USA__202606151151_p7vzul.jpg",
    description: "Supersonic variable-sweep wing strategic long-range bomber, heavily utilized for precise carpet bomb strikes.",
    specs: { topSpeed: "Mach 1.25", range: "9,400 km", type: "Supersonic Strategic Bomber", payload: "75,000 lbs internal weapon load" }
  },
  {
    name: "Boeing B-52 Stratofortress",
    type: "military",
    manufacturer: "Boeing",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504642/Boeing_B-52_Stratofortress__USA__202606151151_kr15ga.jpg",
    description: "An iconic eight-engine strategic heavy bomber operating since the Cold War, engineered for long-range global missions.",
    specs: { topSpeed: "1,050 km/h", range: "14,200 km", type: "Strategic Heavy Bomber", payload: "70,000 lbs weapon inventory" }
  },
  {
    name: "Lockheed SR-71 Blackbird",
    type: "military",
    manufacturer: "Lockheed",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504644/Lockheed_SR-71_Blackbird_USA_202606151151_q1qnpv.jpg",
    description: "The fastest air-breathing manned aircraft in history, operating at Mach 3.3 for high-altitude strategic reconnaissance.",
    specs: { topSpeed: "Mach 3.32", range: "5,400 km", type: "Supersonic Reconnaissance", payload: "Advanced optical/radar sensors" }
  },
  {
    name: "Lockheed C-130 Hercules",
    type: "military",
    manufacturer: "Lockheed",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504688/Lockheed_C-130_Hercules_USA_202606151151_wkeseu.jpg",
    description: "Four-engine turboprop military transport workhorse, capable of operating from rough dirt strips, active in SLAF fleet.",
    specs: { topSpeed: "592 km/h", range: "3,800 km", type: "Tactical Military Airlifter", payload: "42,000 lbs cargo capacity" }
  },
  {
    name: "IAI Kfir C2/C7",
    type: "military",
    manufacturer: "IAI",
    image: "https://res.cloudinary.com/drgzaykow/image/upload/v1781504704/IAI_Kfir_C2_C7_202606151150_yqzgpv.jpg",
    description: "All-weather multirole combat fighter jet utilizing delta-wing setups, historic in Sri Lanka Air Force ground-attack squadrons.",
    specs: { topSpeed: "Mach 2.0", range: "1,300 km", type: "Multirole Fighter-Bomber", payload: "13,415 lbs external weapons" }
  }
];