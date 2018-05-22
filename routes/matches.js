import express from 'express';
import mongoose from 'mongoose';
import '../models/matches.js';

const matches = mongoose.model('matches');
let router = express.Router();

router.post('/addMatch', (req, res) => {
    let data = req.body;
    var match = new matches(data);
    match.save();
    res.json({ "success": true })
});

export default router;
