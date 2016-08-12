export function filterByDistance(list, location, distance = 50) {
  console.log('list', location)
  return list
    .map(e => Object.assign(e, { distance: getDistanceFromLatLonInMi(e.latitude, e.longitude, location.lat, location.lng) }))
    .filter(e => e.distance <= distance)
    .sort((a, b) => a.distance - b.distance);
}

function getDistanceFromLatLonInMi(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return Math.round(d * 0.621371 * 100) / 100; // Distance in mi rounded to 2 decimals
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
