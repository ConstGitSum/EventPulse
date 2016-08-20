function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
  // Radius of the earth in km
  const R = 6371;
  // deg2rad below
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
    (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2))
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  const d = R * c;
  // Distance in mi rounded to 2 decimals
  return Math.round(d * 0.621371 * 100) / 100;
}


export default function filterByDistance(list, location, distance = 50) {
  return list
    .map(e => Object.assign(e,
      { distance: getDistanceFromLatLonInMi(e.latitude, e.longitude, location.lat, location.lng) }))
    .filter(e => e.distance <= distance)
    .sort((a, b) => a.distance - b.distance);
}
