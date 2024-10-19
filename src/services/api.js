import axios from 'axios';

const ORS_API_BASE_URL = 'https://maps.zipmend.com/ors/v2/directions/driving-hgv';
const GOOGLE_PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const API_KEY = process.env.VUE_APP_GOOGLE_PLACES_API_KEY;

export const calculateRoute = async (waypoints, avoidCountries = []) => {
  try {
    const response = await axios.post(ORS_API_BASE_URL, {
      coordinates: waypoints,
      options: {
        avoid_countries: avoidCountries
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error calculating route:', error);
    throw error;
  }
};

export const fetchPlaceSuggestions = async (input, countryCode) => {
  try {
    const response = await axios.get(GOOGLE_PLACES_API_BASE_URL, {
      params: {
        input: input,
        components: `country:${countryCode}`,
        key: API_KEY
      }
    });
    return response.data.predictions;
  } catch (error) {
    console.error('Error fetching place suggestions:', error);
    throw error;
  }
};
