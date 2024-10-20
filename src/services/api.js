import axios from 'axios';

const ORS_API_BASE_URL = 'https://maps.zipmend.com/ors/v2/directions/driving-hgv';

export const calculateRoute = async (waypoints, avoidCountries = []) => {
  try {
    const response = await axios.post(ORS_API_BASE_URL, {
      coordinates: waypoints,
      options: {
        avoid_countries: avoidCountries
      }
    });
    console.log(response, "calc");
    
    return response.data;
  } catch (error) {
    console.error('Error calculating route:', error);
    throw error;
  }
};

const GOOGLE_PLACES_API_BASE_URL = 'http://localhost:8081/api/place/autocomplete';

export const fetchPlaceSuggestions = async (input, countryCode) => {
  try {
    const response = await axios.get(GOOGLE_PLACES_API_BASE_URL, {
      params: {
        input: input,
        components: `country:${countryCode}`
      }
    });
    
    console.log(response.data.predictions, 'place');
    
    return response.data.predictions;
  } catch (error) {
    console.error('Error fetching place suggestions:', error);
    throw error;
  }
};

export const getCoordinatesForPlaceId = async (placeId) => {
  try {
    const response = await axios.get(GOOGLE_PLACES_API_BASE_URL, {
      params: {
        place_id: placeId
      },
    });

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
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