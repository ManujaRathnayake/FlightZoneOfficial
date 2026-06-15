const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // 💡 required: false කියලා අකුරු නූලටම හැදුවා. දැන් Google වලින් එද්දී Password නැති වුණත් අවුලක් වෙන්නේ නෑ!
    password: { type: String, required: false }, 
    profilePic: { type: String, default: "" }, 
    // 💡 default role එක 'Member' කළා (ඔයාගේ පරණ කෝඩ් වලට ගැලපෙන්න 'User' ම ඕනෙ නම් ඒකම තියන්න)
    role: { type: String, default: "Member" },   
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);