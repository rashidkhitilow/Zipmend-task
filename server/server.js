const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8081;

app.use(cors({
  origin: 'http://localhost:8080'
}));

const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const API_KEY = process.env.VUE_APP_GOOGLE_PLACES_API_KEY;

app.get('/api/place/autocomplete', async (req, res) => {
  try {
    const response = await axios.get(GOOGLE_PLACES_API_URL, {
      params: {
        input: req.query.input,
        components: req.query.components,
        key: API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Google Places API:', error.message);
    res.status(500).send('Error fetching data from Google Places API');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
