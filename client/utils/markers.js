var L = require('./leaflet.awesome-markers');

export default function generateMarker(eventType) {
  switch (eventType) {
    case 'athletics': {
      return L.AwesomeMarkers.icon({
        icon: 'futbol-o',
        markerColor: 'lightgreen',
        prefix: 'fa'
      });
    }
    case 'entertainment': {
      return L.AwesomeMarkers.icon({
        icon: 'television',
        markerColor: 'green',
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
        markerColor: 'purple',
        prefix: 'fa'
      });
    }
    case 'coffee': {
      return L.AwesomeMarkers.icon({
        icon: 'cutlery',
        markerColor: 'lightred',
        prefix: 'fa'
      });
    }
    case 'special': {
      return L.AwesomeMarkers.icon({
        icon: 'star',
        markerColor: 'blue',
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
  spin: true,
  markerColor: 'red',
  prefix: 'fa'
});
