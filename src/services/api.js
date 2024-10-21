import axios from 'axios';

const ORS_API_BASE_URL = 'https://maps.zipmend.com/ors/v2/directions/driving-hgv';

export const calculateRoute = async (waypoints, avoidCountries = []) => {
  try {
    const payload = {
      coordinates: waypoints,
    };

    if (avoidCountries.length > 0) {
      payload.options = {
        avoid_countries: avoidCountries
      };
    }
    const response = await axios.post(ORS_API_BASE_URL, payload);
    
    return response.data;
  } catch (error) {
    console.error('Error calculating route:', error);
    throw error;
  }
};

const GOOGLE_PLACES_API_BASE_URL = 'http://localhost:8081/api/place';
// const GOOGLE_PLACES_API_BASE_URL = '/api/place';

export const fetchPlaceSuggestions = async (input, countryCode) => {
  try {
    const response = await axios.get(GOOGLE_PLACES_API_BASE_URL+'/autocomplete', {
      params: {
        input: input,
        components: `country:${countryCode}`
      }
    });    
    return response.data.predictions;
  } catch (error) {
    console.error('Error fetching place suggestions:', error);
    throw error;
  }
};

export const getCoordinatesForPlaceId = async (placeId) => {
  try {
    const response = await axios.get(GOOGLE_PLACES_API_BASE_URL+'/details', {
      params: {
        placeid: placeId
      },
    });

    if (response.data.status === 'OK') {
      const location = response.data.result.geometry.location
      return [location.lat, location.lng];
    } else {
      console.error('Error fetching coordinates:', response.data.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};