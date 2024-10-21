import axios from 'axios';

const GOOGLE_PLACES_API_URL2 = 'https://maps.googleapis.com/maps/api/place/details/json';
const API_KEY = process.env.VUE_APP_GOOGLE_PLACES_API_KEY;

export default async function handler(req, res) {
  try {
    const response = await axios.get(GOOGLE_PLACES_API_URL2, {
      params: {
        placeid: req.query.placeid,
        key: API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Google Places API:', error.message);
    res.status(500).send('Error fetching data from Google Places API');
  }
}
