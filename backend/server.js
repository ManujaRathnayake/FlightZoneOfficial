const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cron = require('node-cron');
const axios = require('axios');
const Flight = require('./models/Flight'); 
const Parser = require('rss-parser');
const parser = new Parser();
const mongoose = require('mongoose');

// 👑 CLOUDINARY & MULTER UPLOAD IMPORTS
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ==========================================================
// 👑 CLOUDINARY CONFIGURATION & STORAGE SETUP
// ==========================================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'drgzaykow',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 📸 1. ඇඩ්මින් දාන ඉමේජ් එක ඔටෝමැටිකවම Cloudinary සර්වර් එකට අප්ලෝඩ් කරන ස්ටෝරේජ් එක
const aircraftStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'flightzone_aircrafts', // Cloudinary එකේ හැදෙන Folder එකේ นම
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const uploadAircraftImage = multer({ storage: aircraftStorage });

// 📸 2. PLANESPOTTERS ලා දාන පින්තූර ඔටෝමැටිකවම සේව් වෙන වෙනම ක්ලවුඩිනරි ස්ටෝරේජ් එක
const spotterStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'flightzone_spotters', // Spotters ලගේ පින්තූර සේව් වෙන්න වෙනම ෆෝල්ඩර් එකක්
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
// එකපාර පින්තූර 6ක් වෙනකන් අප්ලෝඩ් කරන්න පුළුවන් වෙන්න multer සෙට් කරනවා 🔥
const uploadSpotterImages = multer({ storage: spotterStorage });


// ==========================================================
// 👑 MONGOOSE SCHEMA & MODEL FOR DYNAMIC AIRCRAFTS DIRECTORY
// ==========================================================
const AircraftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // commercial, military
  manufacturer: { type: String, required: true },
  image: { type: String, required: true }, // Cloudinary CDN URL එක සේව් වෙන්නේ මෙතනට 🔥
  description: { type: String, required: true },
  specs: {
    range: String,
    capacity: String,
    engines: String,
    wingspan: String,
    topSpeed: String,
    payload: String
  }
}, { timestamps: true });

const Aircraft = mongoose.models.Aircraft || mongoose.model('Aircraft', AircraftSchema);


// ==========================================================
// 👑 LIVE AIRCRAFT DIRECTORY CRUD API ROUTES
// ==========================================================

// 📥 1. GET ALL AIRCRAFTS
app.get('/api/aircrafts', async (req, res) => {
  try {
    const aircrafts = await Aircraft.find().sort({ createdAt: -1 });
    res.json(aircrafts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📤 2. ADD NEW AIRCRAFT (With Automated Cloudinary Upload)
app.post('/api/aircrafts/add', uploadAircraftImage.single('image'), async (req, res) => {
  try {
    const { name, type, manufacturer, description, range, capacity, engines, wingspan, topSpeed, payload } = req.body;
    const imageUrl = req.file ? req.file.path : ''; 

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Aircraft capture image is required!' });
    }

    const newAircraft = new Aircraft({
      name, type, manufacturer,
      image: imageUrl, 
      description,
      specs: { range, capacity, engines, wingspan, topSpeed, payload }
    });

    await newAircraft.save();
    res.json({ success: true, message: 'Aircraft asset deployed successfully with Cloudinary Link!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✏️ 3. EDIT AIRCRAFT SPECS & IMAGE
app.put('/api/aircrafts/edit/:id', uploadAircraftImage.single('image'), async (req, res) => {
  try {
    const { name, type, manufacturer, description, range, capacity, engines, wingspan, topSpeed, payload } = req.body;
    let updateFields = {
      name, type, manufacturer, description,
      specs: { range, capacity, engines, wingspan, topSpeed, payload }
    };

    if (req.file) {
      updateFields.image = req.file.path;
    }

    const updatedAircraft = await Aircraft.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.json({ success: true, message: 'Aircraft specs configuration updated!', data: updatedAircraft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ 4. DELETE AIRCRAFT FROM DIRECTORY
app.delete('/api/aircrafts/:id', async (req, res) => {
  try {
    await Aircraft.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Aircraft deleted successfully from HQ directory!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==========================================================
// 👑 PLANESPOTTERS LIVE MULTI-IMAGE UPLOAD ROUTE (FIXED 🛠️)
// ==========================================================
// 💡 [BUG FIX]: මොඩල් එක ක්‍රෑෂ් නොවී කෙලින්ම ෆයිල් එකෙන්ම Require කරගන්නවා මචං
const Spotter = require('./models/Spotter'); 

// [BUG FIX]: Frontend (SubmitCapture.jsx) uploads images to ImgBB first and then sends
// the resulting CDN URLs as a JSON array. The previous multer middleware was incorrectly
// expecting a multipart/form-data upload here, which caused the route to receive no files
// and reject every submission. Removed multer so the route reads imageUrls from req.body.
app.post('/api/spotters/submit', async (req, res) => {
  try {
    const { title, location, userName, instagram, images } = req.body;
    
    // ෆ්‍රොන්ටෙන්ඩ් එකෙන් JSON body එකේ images array එකක් විදිහට CDN URL ලිස්ට් එකක් ලැබෙනවා
    const imageUrls = Array.isArray(images) ? images : [];

    if (imageUrls.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one aircraft capture is required!' });
    }
    
    const newSubmission = new Spotter({
      title,
      location,
      userName,
      instagram,
      images: imageUrls, // ImgBB CDN ලින්ක්ස් ඔක්කොම Array එකක් විදිහට සේව් වෙනවා
      status: 'Pending' // මුලින් Pending වැටිලා, ඇඩ්මින් පැනල් එකෙන් ඇප්රූව් කරාම හෝම් පේජ් එකට ලයිව් යනවා
    });

    await newSubmission.save();
    res.json({ success: true, message: 'Capture submitted to Flight Zone HQ successfully!' });
  } catch (err) {
    console.error("❌ Spotter Upload Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// ==========================================================
// ⏰ AERODATABOX CRON JOB & FLIGHT BOARD LOGIC
// ==========================================================
const RAPIDAPI_KEY = '047648dea8mshf58148b97285974p1c32eejsn1ecfc65ba3c0';

async function updateFlightSchedule() {
  const airports = [
    { icao: 'VCBI', iata: 'CMB' },
    { icao: 'VCRI', iata: 'HRI' }
  ];

  const now = new Date();
  const fromTime = now.toISOString().slice(0, 16); 
  const toTime = new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString().slice(0, 16); 

  for (const airport of airports) {
    try {
      console.log(`[AeroDataBox] Fetching flights for ${airport.iata}...`);

      const url = `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${airport.icao}/${fromTime}/${toTime}`;
      
      const response = await axios.get(url, {
        params: { withLeg: 'false', withCancelled: 'true', withCodeshared: 'false', withCargo: 'false', withPrivate: 'false' },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
        }
      });

      await Flight.deleteMany({ airportCode: airport.iata });

      let flightObjects = [];

      if (response.data && response.data.arrivals) {
        response.data.arrivals.forEach(f => {
          const flightTime = f.movement 
            ? (f.movement.scheduledTimeLocal || f.movement.scheduledTimeUtc || f.movement.actualTimeLocal) 
            : null;

          flightObjects.push({
            airportCode: airport.iata,
            type: 'arrivals',
            flightNumber: f.number,
            airline: f.airline ? f.airline.name : 'Unknown Airline',
            aircraft: f.aircraft ? f.aircraft.model : 'Commercial Jet',
            status: f.status || 'Scheduled',
            time: flightTime ? new Date(flightTime) : new Date()
          });
        });
      }

      if (response.data && response.data.departures) {
        response.data.departures.forEach(f => {
          const flightTime = f.movement 
            ? (f.movement.scheduledTimeLocal || f.movement.scheduledTimeUtc || f.movement.actualTimeLocal) 
            : null;

          flightObjects.push({
            airportCode: airport.iata,
            type: 'departures',
            flightNumber: f.number,
            airline: f.airline ? f.airline.name : 'Unknown Airline',
            aircraft: f.aircraft ? f.aircraft.model : 'Commercial Jet',
            status: f.status || 'Scheduled',
            time: flightTime ? new Date(flightTime) : new Date()
          });
        });
      }

      if (flightObjects.length > 0) {
        await Flight.insertMany(flightObjects);
        console.log(`[AeroDataBox] Successfully saved ${flightObjects.length} flights for ${airport.iata}!`);
      } else {
        console.log(`[AeroDataBox] No flights found for ${airport.iata} right now.`);
      }

      await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (err) {
      console.error(`[AeroDataBox] Error updating flights for ${airport.iata}:`, err.response ? JSON.stringify(err.response.data) : err.message);
    }
  }
}

cron.schedule('0 * * * *', () => {
  console.log('Running hourly flight schedule update from AeroDataBox...');
  updateFlightSchedule();
});

updateFlightSchedule();


// ==========================================================
// 📡 AVIATION NEWS API ROUTE (Google News RSS + Pixabay)
// ==========================================================
app.get('/api/aviation-news', async (req, res) => {
  let formattedNews = [];
  
  try {
    const pixabayKey = process.env.PIXABAY_API_KEY;
    console.log("[Google News] Fetching live aviation RSS feeds...");

    const feed = await parser.parseURL('https://news.google.com/rss/search?q=aviation+airlines+aircraft&hl=en-US&gl=US&ceid=US:en');
    const rawNews = (feed && feed.items) ? feed.items : [];

    formattedNews = await Promise.all(rawNews.map(async (item) => {
      const titleText = item.title || "Aviation Industry Update";
      const sourceName = item.source && typeof item.source === 'object' ? item.source._ : "Aviation Stream";
      
      let searchQuery = "airplane+aviation"; 

      const lowerTitle = titleText.toLowerCase();
      if (lowerTitle.includes("airbus")) searchQuery = "airbus+airplane";
      else if (lowerTitle.includes("boeing")) searchQuery = "boeing+airplane";
      else if (lowerTitle.includes("fighter") || lowerTitle.includes("military") || lowerTitle.includes("stealth")) searchQuery = "fighter+jet";
      else if (lowerTitle.includes("private") || lowerTitle.includes("charter")) searchQuery = "private+jet";
      else if (lowerTitle.includes("cargo") || lowerTitle.includes("freight")) searchQuery = "cargo+plane";
      else if (lowerTitle.includes("drone")) searchQuery = "drone";
      else if (lowerTitle.includes("helicopter")) searchQuery = "helicopter";
      else if (lowerTitle.includes("srilankan") || lowerTitle.includes("sri lanka")) searchQuery = "srilankan+airlines";

      let finalImage = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600"; 

      if (pixabayKey) {
        try {
          const pixabayUrl = `https://pixabay.com/api/?key=${pixabayKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=3`;
          const pixImgRes = await axios.get(pixabayUrl);
          
          if (pixImgRes.data && pixImgRes.data.hits && pixImgRes.data.hits.length > 0) {
            const hits = pixImgRes.data.hits;
            const randomHit = hits[Math.floor(Math.random() * hits.length)];
            finalImage = randomHit.webformatURL || randomHit.largeImageURL;
          }
        } catch (pErr) {
          console.error("[News Pixabay Fetch] Error, active fallback used.");
        }
      }

      return {
        title: titleText,
        description: item.contentSnippet || "Click Read Full Coverage to view the complete article on the official news site.",
        source: sourceName,
        image_url: finalImage,
        url: item.link || "#"
      };
    }));

  } catch (error) {
    console.log("[Google RSS Error] Caught error, utilizing backup builder:", error.message);
  }

  const backupPool = [
    {
      title: "SriLankan Airlines Expands Indian Network with Additional Weekly Flights",
      description: "Our national carrier SriLankan Airlines has announced an increase in flight frequencies to major Indian destinations including Chennai, Mumbai, and Bangalore to meet rising corporate and tourism demand.",
      source: "SriLankan Hub",
      image_url: "https://images.unsplash.com/photo-1544016718-2c261787c82a?q=80&w=600",
      url: "https://www.srilankan.com"
    },
    {
      title: "Bandaranaike International Airport (BIA) Unveils New E-Gate System for Passengers",
      description: "In a bid to reduce immigration queue times, Airport and Aviation Services Sri Lanka (AASL) has successfully installed advanced automated electronic gates for Sri Lankan passport holders.",
      source: "AASL Updates",
      image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600",
      url: "https://www.airport.lk"
    },
    {
      title: "Global Commercial Aviation Industry Reports Record Cargo Demand Surges",
      description: "International air freight networks see unprecedented load factors over the final quarter, driven heavily by global supply chain shifting and express ecommerce logistics.",
      source: "IATA Insights",
      image_url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=600",
      url: "https://www.iata.org"
    },
    {
      title: "Next-Generation Airbus A321neo Aircraft Inductions Elevate Regional Air Travel Eco-Efficiency",
      description: "Major global single-aisle aircraft operators rapidly accelerate fleet renewals to cut carbon footprints by 20% using modern LEAP-1A high-bypass turbofan integrations.",
      source: "AeroTime Market",
      image_url: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=600",
      url: "https://www.aerotime.aero"
    },
    {
      title: "Mattala Rajapaksa International Airport (MRIA) Announces New Charter Flight Alliances",
      description: "MRIA accelerates regional tourism integration by establishing direct long-haul charter frameworks with leading Eastern European tour operators.",
      source: "AASL Media",
      image_url: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=600",
      url: "https://www.airport.lk"
    },
    {
      title: "Emirates Announces Fleet-Wide Premium Economy Retrofit for South Asian Routes",
      description: "Emirates steps up its regional product offering by deploying completely retrofitted Boeing 777 aircraft featuring its signature Premium Economy cabins.",
      source: "AeroXpress",
      image_url: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=600",
      url: "https://www.emirates.com"
    },
    {
      title: "Qatar Airways Named World's Best Airline for the Consecutive Year at Skytrax Awards",
      description: "Doha-based Qatar Airways solidifies its industry leadership by securing multiple top-tier accolades including World's Best Business Class at the prestigious awards.",
      source: "Skytrax News",
      image_url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=600",
      url: "https://www.qatarairways.com"
    },
    {
      title: "Supersonic Commercial Flight Research Gains Momentum with New Aerodynamic Testing",
      description: "Aviation tech firms achieve massive milestones in quiet supersonic boom reduction models, paving the way for sustainable Mach 1.7 overland travel.",
      source: "TechAero",
      image_url: "https://images.unsplash.com/photo-1516941019053-53d71ff98f12?q=80&w=600",
      url: "https://www.aviationweek.com"
    },
    {
      title: "Aviation Fuel Sector Targets 100% Sustainable Aviation Fuel (SAF) Production Scales",
      description: "Global energy groups partner with major airline alliances to radically increase SAF infrastructure, aiming to drop lifecycle airline emissions by up to 80%.",
      source: "EcoFlight",
      image_url: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=600",
      url: "https://www.icao.int"
    },
    {
      title: "Air Traffic Management Systems Upgrade with AI Predictive Rerouting Core Tools",
      description: "Eurocontrol and global navigation service providers roll out next-gen artificial intelligence protocols to predict and dynamically mitigate weather delays.",
      source: "SkyGuide",
      image_url: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600",
      url: "https://www.eurocontrol.int"
    }
  ];

  let loopIndex = 0;
  while (formattedNews.length < 50 && backupPool.length > 0) {
    const backupItem = backupPool[loopIndex % backupPool.length];
    
    formattedNews.push({
      ...backupItem,
      title: formattedNews.length >= backupPool.length 
        ? `${backupItem.title} - Global Vol ${Math.floor(formattedNews.length / backupPool.length) + 1}`
        : backupItem.title
    });
    loopIndex++;
  }

  res.json(formattedNews);
});


// ==========================================================
// 📸 WALLPAPERS API ROUTE (Pixabay)
// ==========================================================
app.get('/api/aviation-wallpapers', async (req, res) => {
  try {
    const apiKey = process.env.PIXABAY_API_KEY;
    if (!apiKey) {
      console.error("[Pixabay] Error: PIXABAY_API_KEY is missing!");
      return res.status(500).json({ error: "Pixabay API key configuration missing" });
    }

    const { query } = req.query;
    console.log(`[Pixabay API] Fetching live plane images for query: ${query || 'airplane'}...`);

    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query || 'airplane')}&image_type=photo&orientation=horizontal&per_page=16`;
    const response = await axios.get(url);
    
    const wallpapers = (response.data.hits || []).map((img) => ({
      id: img.id,
      title: img.tags ? img.tags.toUpperCase() : "AVIATION HD WALLPAPER",
      url: img.largeImageURL 
    }));

    res.json(wallpapers);
  } catch (error) {
    console.error("Error fetching images from Pixabay API:", error.message);
    res.status(500).json({ error: "Failed to fetch live wallpapers" });
  }
});


// ==========================================================
// 📡 APPLICATION ENDPOINT ROUTING LIST
// ==========================================================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));

// [BUG FIX]: spotterRoutes was commented out, so /api/spotters/all, /api/spotters/approved,
// /api/spotters/:id/approve, and /api/spotters/:id (DELETE) were all returning 404.
// AdminDashboard and Home page depend on these routes. Re-enabled here.
// The /submit route above is defined inline and will still take priority over any
// route with the same path in spotterRoutes (Express matches in order of registration).
app.use('/api/spotters', require('./routes/spotterRoutes'));

app.use('/api/ai', require('./routes/aiRoutes')); 
app.use('/api/flights', require('./routes/flightRoutes')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Flight Zone Core Backend running on port ${PORT}`));