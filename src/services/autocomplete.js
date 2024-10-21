import axios from 'axios';

const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const API_KEY = process.env.VUE_APP_GOOGLE_PLACES_API_KEY;

export default async function handler(req, res) {
  try {
    const response = await axios.get(GOOGLE_PLACES_API_URL, {
      params: {
        input: req.query.input,
        components: req.query.components,
        key: API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Google Places API:', error.message);
    res.status(500).send('Error fetching data from Google Places API');
  }
}
