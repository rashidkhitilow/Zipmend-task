const axios = require('axios');

const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const GOOGLE_PLACES_API_URL2 = 'https://maps.googleapis.com/maps/api/place/details/json';
const API_KEY = process.env.VUE_APP_GOOGLE_PLACES_API_KEY; // Your Google Places API key

export default async function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET') {
    if (req.url.includes('/autocomplete')) {
      try {
        const response = await axios.get(GOOGLE_PLACES_API_URL, {
          params: {
            input: query.input,
            components: query.components,
            key: API_KEY,
          },
        });
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).send('Error fetching data from Google Places API');
      }
    } else if (req.url.includes('/details')) {
      try {
        const response = await axios.get(GOOGLE_PLACES_API_URL2, {
          params: {
            placeid: query.placeid,
            key: API_KEY,
          },
        });
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).send('Error fetching data from Google Places API');
      }
    }
  }
}
