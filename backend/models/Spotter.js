const mongoose = require('mongoose');

const SpotterSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    instagram: { type: String, default: "" },
    images: [{ type: String, required: true }], // 👈 string එකක් වෙනුවට Array එකක් කලා [images]
    status: { type: String, default: 'Pending' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Spotter', SpotterSchema);