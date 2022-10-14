import axios from 'axios';
import qs from 'qs';

const baseUrl = `http://api.indeed.com/ads/apisearch?`;
const params = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript' // query that we are looking for
};

const buildUrl = (zipcode) => {
  const query = qs.stringify({ ...params, l: zipcode });
  return `${baseUrl}${query}`;
};

export const getJobs = async (zipcode) => { return await axios.get(buildUrl(zipcode)); }
