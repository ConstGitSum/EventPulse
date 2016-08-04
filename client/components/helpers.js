import axios from 'axios';

export function getCoords(addressInput) {
  console.log(process.env.GEOAPI_KEY)
  console.log(process.env.FACEBOOK_SECRET)
  const API_KEY = process.env.GEOAPI_KEY;
  const ROOT_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}`;
  const address = addressInput.replace(/ /g, '+').replace(/;/g, '+');
  const url = `${ROOT_URL}&address=${address}`;

  console.log(address)

  return axios.get(url)
    .then(res => { 
      if (res.data.status === 'ZERO_RESULTS') {
        throw new Error('Error getting coordinates');
      }
      return res.data.results[0];
    })
}
