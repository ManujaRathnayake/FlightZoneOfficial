const express = require('express');
const router = express.Router();
const Spotter = require('../models/Spotter');

// 1. යූසර් පින්තූර කිහිපයක් සබ්මිට් කිරීම
router.post('/', async (req, res) => {
    const { userName, title, location, instagram, images } = req.body; // 👈 images කලා
    try {
        const newPost = new Spotter({ userName, title, location, instagram, images });
        await newPost.save();
        res.json({ message: 'Submission uploaded successfully!' });
    } catch (err) { res.status(500).send('Server Error'); }
});

// 2. ඇඩ්මින්ට ඔක්කොම ලබා දීම
router.get('/all', async (req, res) => {
    try { const posts = await Spotter.find().sort({ date: -1 }); res.json(posts); } catch (err) { res.status(500).send('Server Error'); }
});

// 3. හෝම් පේජ් එකට Approved ඒවා ලබා දීම
router.get('/approved', async (req, res) => {
    try { const posts = await Spotter.find({ status: 'Approved' }).sort({ date: -1 }); res.json(posts); } catch (err) { res.status(500).send('Server Error'); }
});

// 4. ඇඩ්මින් විසින් Approve කිරීම
router.put('/:id/approve', async (req, res) => {
    try { const post = await Spotter.findById(req.params.id); post.status = 'Approved'; await post.save(); res.json({ message: 'Approved!' }); } catch (err) { res.status(500).send('Server Error'); }
});

// 5. ඇඩ්මින් විසින් Delete කිරීම
router.delete('/:id', async (req, res) => {
    try { await Spotter.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted!' }); } catch (err) { res.status(500).send('Server Error'); }
});

// 6. ලොග් වී සිටින යූසර්ගේ Pending Captures පමණක් ලබා දීම
router.get('/my-pending/:userName', async (req, res) => {
    try {
        const pendingPosts = await Spotter.find({ userName: req.params.userName, status: 'Pending' }).sort({ date: -1 });
        res.json(pendingPosts);
    } catch (err) { res.status(500).send('Server Error'); }
});
module.exports = router;