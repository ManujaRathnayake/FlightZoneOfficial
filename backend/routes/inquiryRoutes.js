const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// 1. සාමාන්‍ය පරිශීලකයා Inquiry එකක් සබ්මිට් කිරීම
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const newInquiry = new Inquiry({ name, email, subject, message });
        await newInquiry.save();
        res.json({ message: 'Inquiry submitted successfully!' });
    } catch (err) { res.status(500).send('Server Error'); }
});

// 2. ඇඩ්මින්ට ඔක්කොම Inquiries ටික ලබා දීම
router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ date: -1 });
        res.json(inquiries);
    } catch (err) { res.status(500).send('Server Error'); }
});

// 3. Status එක Approve හෝ Reject ලෙස වෙනස් කිරීම
router.put('/:id', async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
        
        inquiry.status = req.body.status;
        await inquiry.save();
        res.json({ message: `Inquiry marked as ${req.body.status}` });
    } catch (err) { res.status(500).send('Server Error'); }
});

// 4. Inquiry එකක් ඩේටාබේස් එකෙන් මකා දැමීම
router.delete('/:id', async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (err) { res.status(500).send('Server Error'); }
});

module.exports = router;