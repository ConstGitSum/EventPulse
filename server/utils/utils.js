var axios = require('axios');

module.exports = {
  getCoords
};

// param event details
// attempts to geocode event location
// returns updated event details if successful
function getCoords(event) {
  const API_KEY = process.env.GEO_API_KEY;
  const ROOT_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}`;
  const address = event.location.replace(/ /g, '+').replace(/;/g, '+');
  const GEO_URL = `${ROOT_URL}&address=${address}`;

  return axios.get(GEO_URL)
  .then(res => { 
    if (res.data.status === 'ZERO_RESULTS') {
      throw new Error('Error getting coordinates');
    }
    return res.data.results[0];
  })
  .then(res =>
    Object.assign(event, {
      location: res.formatted_address,
      latitude: res.geometry.location.lat,
      longitude: res.geometry.location.lng
    })
  )
}
