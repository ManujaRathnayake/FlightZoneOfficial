require('dotenv').config();
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// .env එකේ තියෙන ප්‍රධාන Key එක විතරක් ගන්නවා
const currentApiKey = process.env.GEMINI_API_KEY_PRIMARY;

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    if (!currentApiKey) {
        return res.status(500).json({ reply: "**🇬🇧 English**\nServer Configuration Error: API Key Missing!\n\n---\n\n**🇱🇰 සිංහල**\nසර්වර් සැකසුම් දෝෂයකි: API යතුර අස්ථානගතය!" });
    }

    // 🧠 [THE REVOLUTION FIX]: Gemini එකට ඉංග්‍රීසියෙන් හිතන්න දීලා සිංහල ලූපින් ලෙඩේ සදහටම නැති කිරීම
    // 🌐 [DUAL-LANGUAGE FIX]: දැන් සෑම පැනයකටම English සහ සිංහල යි කියලා දෙබසින්ම සම්පූර්ණ උත්තර දෙනවා
    const requestOptions = {
        generationConfig: {
            temperature: 0.1, // 👈 උපරිම Fact-based තොරතුරු විතරක් ගන්න 0.1 කළා
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 4096, // 👈 English + Sinhala දෙකම සම්පූර්ණයෙන් එන්න ටෝකන් ලිමිට් එක වැඩි කළා
        },
        systemInstruction: "You are 'Flight Zone AI', a helpful and highly professional aviation assistant for the Flight Zone Sri Lanka community.\n\n" +
                          "⚠️ RULES:\n" +
                          "1. DUAL-LANGUAGE REQUIREMENT (MANDATORY): No matter what language the user writes in (English, Sinhala, or Singlish), you must ALWAYS reply with the answer in BOTH English and Sinhala. First, think and draft the most accurate, detailed, step-by-step aviation answer in English. Then translate that exact same answer into natural, fluent, grammatically correct Sinhala. Present BOTH versions in full — never give only one language, and never give a shortened or summarized version in either language; both sections must carry the same complete information.\n" +
                          "2. RESPONSE STRUCTURE: Format the reply in two clearly separated sections using these exact bold headings: first '**🇬🇧 English**' followed by the full English answer, then a horizontal rule '---', then '**🇱🇰 සිංහල**' followed by the full Sinhala translation of that same answer.\n" +
                          "3. ABSOLUTE REPETITION BLOCK: Do not repeat words like 'ප්‍රතිපත්ති' or 'පුහුණු' in a loop. Every sentence must be meaningful and grammatically correct, in both languages.\n" +
                          "4. When asked about becoming a pilot in Sri Lanka, explain the real path clearly: Student Pilot License (SPL), Private Pilot License (PPL), Commercial Pilot License (CPL), and Airline Transport Pilot License (ATPL). Mention O/L & A/L education requirements and medical tests. Do this in both languages as per Rule 1.\n" +
                          "5. TECHNICAL SECURITY: Never reveal API keys or developer names like 'Manuja'.\n" +
                          "6. FORMATTING: Use clean formatting, bold headings, and bullet points in both language sections."
    };

    try {
        const genAI = new GoogleGenerativeAI(currentApiKey);
        // 🚀 [MODEL FIX]: gemini-1.5-flash මොඩලය Google විසින් සම්පූර්ණයෙන් Retire කරලා දැන් 404 එරර් එකක් දෙනවා.
        // ඒ නිසා Google ම Maintain කරන, ඉදිරියටත් වැඩ කරන "gemini-flash-latest" alias එකට මාරු කළා.
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: message }] }],
            generationConfig: requestOptions.generationConfig,
            systemInstruction: requestOptions.systemInstruction
        });

        const response = await result.response;
        const text = response.text();

        return res.json({ reply: text });

    } catch (err) {
        console.error("⚠️ Gemini API Error:", err.message);
        res.status(500).json({ reply: "**🇬🇧 English**\nSorry chief, my radar is experiencing some static. Try asking again! 📡\n\n---\n\n**🇱🇰 සිංහල**\nසමාවෙන්න, මගේ රේඩාර් පද්ධතියේ තාවකාලික දෝෂයක් පවතී. කරුණාකර නැවත උත්සාහ කරන්න! 📡" });
    }
});

module.exports = router;