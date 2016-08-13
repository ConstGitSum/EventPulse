var L = require('./leaflet.awesome-markers');

export default function generateMarker(category) {
  switch (category) {
    case 'athletics': {
      return L.AwesomeMarkers.icon({
        icon: 'futbol-o',
        markerColor: 'green',
        prefix: 'fa'
      });
    }
    case 'entertainment': {
      return L.AwesomeMarkers.icon({
        icon: 'television',
        markerColor: 'blue',
        prefix: 'fa'
      });
    }
    case 'nightlife': {
      return L.AwesomeMarkers.icon({
        icon: 'glass',
        markerColor: 'pink',
        prefix: 'fa'
      });
    }
    case 'dining': {
      return L.AwesomeMarkers.icon({
        icon: 'cutlery',
        markerColor: 'darkred',
        prefix: 'fa'
      });
    }
    case 'coffee': {
      return L.AwesomeMarkers.icon({
        icon: 'coffee',
        markerColor: 'darkpurple',
        prefix: 'fa'
      });
    }
    case 'special': {
      return L.AwesomeMarkers.icon({
        icon: 'star',
        markerColor: 'cadetblue',
        prefix: 'fa'
      });
    }
    default: {
      return L.AwesomeMarkers.icon({
        icon: 'smile-o',
        markerColor: 'orange',
        prefix: 'fa'
      });
    }
  }
}

export const userMarker = L.AwesomeMarkers.icon({
  icon: 'user',
  markerColor: 'red',
  prefix: 'fa'
});

export const alertMarker = L.AwesomeMarkers.icon({
  icon: 'exclamation',
  extraClasses: 'animated pulse infinite',
  markerColor: 'red',
  prefix: 'fa'
});
