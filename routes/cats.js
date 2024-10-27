const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Replace 'YOUR_API_KEY' with your actual API key from The Cat API
const API_KEY = "live_jz1MZsiPZ1ZxghEbfo7JAplBaFa8LN7zfNETJLnktkcLSiDLiJg0WeVdfFdCqESN";
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=1`;

// GET route to render the page with cat images
router.get('/', async (req, res) => {
    try {
        // Fetch initial set of cat images
        const response = await fetch(API_URL, {
            headers: { 'x-api-key': API_KEY }
        });
        const catImages = await response.json();

        // Render the 'cats' view, passing in the initial images
        res.render('cats', { catImages });
    } catch (error) {
        console.error('Error fetching cat images:', error);
        res.status(500).send('Xatolik yuz berdi.');
    }
});


// Route to fetch new cat images for AJAX request
router.get('/images', async (req, res) => {
    try {
        const response = await fetch(API_URL, {
            headers: { 'x-api-key': API_KEY }
        });
        const newCatImages = await response.json();
        res.json(newCatImages); // Send images as JSON
    } catch (error) {
        console.error('Error fetching new cat images:', error);
        res.status(500).send('Xatolik yuz berdi.');
    }
});


module.exports = router;
