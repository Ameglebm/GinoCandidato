const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

router.post('/vote', async (req, res) => {
    try {
        const { fullName, neighborhood } = req.body;
        const vote = await Vote.create({
            fullName,
            neighborhood,
            candidate: 'Gino', 
        });
        res.status(201).json(vote);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar o voto.' });
    }
});


router.get('/neighborhoods', async (req, res) => {
    try {
        const votes = await Vote.findAll();
        const voteCounts = votes.reduce((acc, vote) => {
            if (!acc[vote.neighborhood]) {
                acc[vote.neighborhood] = 0;
            }
            acc[vote.neighborhood]++;
            return acc;
        }, {});
        res.status(200).json(voteCounts);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os votos por bairro.' });
    }
});

router.get('/total', async (req, res) => {
    try {
        const count = await Vote.count();
        res.status(200).json({ totalVotes: count });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o total de votos.' });
    }
});

module.exports = router;
