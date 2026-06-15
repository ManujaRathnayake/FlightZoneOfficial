const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // 👈 Approved, Pending, Rejected බලන්න මේක ඇඩ් කලා
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', InquirySchema);