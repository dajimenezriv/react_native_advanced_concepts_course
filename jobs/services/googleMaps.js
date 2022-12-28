import axios from 'axios';

const apiKey = '<GOOGLE_MAPS_API_KEY>';
const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json`;

export const getZipcode = async ({ longitude, latitude }) => {
  const res = await axios.get(`${baseUrl}?latlng=${latitude},${longitude}&key=${apiKey}`);
  const zipcode = res.data.results[1].address_components.pop().short_name;
  return zipcode;
};
