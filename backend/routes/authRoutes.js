const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library'); // 👈 Google Auth Library එක ඉම්පෝට් කළා

// 💡 ඔයාගේ පිරිසිදු Google Client ID එක
const GOOGLE_CLIENT_ID = "814676699984-9tks7v787362j88ega869ko8ppjhpk8t.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// 🔐 Register & Login Routes (සාමාන්‍ය ඊමේල්/පාස්වර්ඩ්)
router.post('/register', register);
router.post('/login', login);

// 🌐 ─── GOOGLE LOGIN API ENDPOINT ───
router.post('/google-login', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Google token is required" });
    }

    try {
        // 1. ගූගල් එකෙන් එවපු ආරක්ෂිත Token එක බීකන්ඩ් එකෙන් Verify කිරීම
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        
        // 2. යූසර්ගේ ගූගල් ප්‍රොෆයිල් එකේ විස්තර (Payload) ටික වෙන් කර ගැනීම
        const { name, email, picture } = ticket.getPayload();

        // 3. යූසර් දැනටමත් අපේ MongoDB ඩේටාබේස් එකේ ඉන්නවද කියලා ඊමේල් එකෙන් බලනවා
        let user = await User.findOne({ email });

        if (!user) {
            // 4. යූසර් කෙනෙක් නැත්නම්, ගූගල් ඩේටා පාවිච්චි කරලා ඔටෝම අලුත් එකවුන්ට් එකක් හදනවා
            user = new User({
                name,
                email,
                profilePic: picture,
                role: 'Member' // 👈 Default රෝල් එක මෙම්බර් විදිහට සෙට් කළා
            });
            await user.save();
        }

        // 5. ෆ්‍රන්ට්එන්ඩ් එකට සාර්ථකයි කියලා යූසර්ගේ ඩේටා ටික රෙස්පොන්ස් එකක් විදිහට යවනවා
        return res.status(200).json({ 
            message: "Google Login successful", 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                profilePic: user.profilePic, 
                role: user.role 
            } 
        });

    } catch (err) {
        console.error("🚨 GOOGLE AUTH ERROR IN TERMINAL:", err);
        return res.status(500).json({ message: "Google authentication failed on server" });
    }
});

// 👑 1. ඔක්කොම යූසර්ස්ලා ටික ඇඩ්මින්ට ලබා දෙන API එක
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password').sort({ date: -1 }); // පාස්වර්ඩ් හැර අනිත් විස්තර විතරක් ගනී
        res.json(users);
    } catch (err) { 
        res.status(500).send('Server Error'); 
    }
});

// 👑 2. යූසර් කෙනෙක්ව ඇඩ්මින් කෙනෙක් කිරීමට Role එක වෙනස් කරන API එක
router.put('/users/:id/make-admin', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.role = 'Admin'; // 👈 ඔයාගේ Navbar එකේ පරීක්ෂාවට ගැලපෙන විදිහට 'Admin' ලෙසම තැබුවා
        await user.save();
        res.json({ message: `${user.name} is now an Administrator!` });
    } catch (err) { 
        res.status(500).send('Server Error'); 
    }
});

// 👤 3. පරිශීලකයාට තමන්ගේ නම (Name) සහ පින්තූරය (Profile Pic) වෙනස් කිරීමට ඉඩ දීම
router.put('/update-profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // 1. නම වෙනස් කිරීම
        user.name = req.body.name; 

        // 2. 📷 ෆ්‍රන්ට්එන්ඩ් එකෙන් අලුත් පින්තූරයක් (Base64) එවලා තියෙනවා නම් විතරක් ඒක අප්ඩේට් කරනවා
        if (req.body.profilePic) {
            user.profilePic = req.body.profilePic;
        }

        await user.save();

        // 3. අලුත්ම ඩේටා ටික LocalStorage එකට යවන්න Response එකක් දෙනවා
        res.json({ 
            message: 'Profile updated successfully!', 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                profilePic: user.profilePic, 
                role: user.role 
            } 
        });
    } catch (err) { 
        res.status(500).send('Server Error'); 
    }
});

module.exports = router;