const mongoose = require('mongoose');
const connectDB = async () => {
    try { await mongoose.connect(process.env.MONGO_URI); console.log('MongoDB Connected...'); }
    catch (err) {
        // 🛑 [SERVER-CRASH FIX]: Mongo එක Connect වෙන්නේ නැතිනම් process.exit(1) කරලා
        // සර්වර් එකම කිල් වෙන එක නිසා AI Chatbot එකවත් වැඩ කරේ නෑ.
        // දැන් Mongo Error එක Console එකේ පෙන්නලා, ඒත් සර්වර් එක දුවන්න දෙනවා.
        console.error('⚠️ MongoDB Connection Error:', err.message);
        console.error('⚠️ Server will keep running, but DB-dependent routes (login, inquiries, spotters, flights) will not work until this is fixed.');
    }
};
module.exports = connectDB;