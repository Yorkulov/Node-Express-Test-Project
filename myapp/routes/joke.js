const axios = require('axios');
var express = require('express');
var router = express.Router();


const fetchJoke = async () => {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
    return response.data;
};

// Sahifani ko'rsatish
router.get('/', async (req, res) => {
    try {
        const joke = await fetchJoke();
        res.render('joke', { joke });
    } catch (error) {
        console.error('Hazil olishda xato:', error);
        res.status(500).send('Hazil olishda xato.');
    }
});

module.exports = router;
