export default function generateMarker(eventType) {
  switch (eventType) {
    case (eventType === 'athletics'): {
      return L.AwesomeMarkers.icon({
        icon: 'futbol-o',
        markerColor: 'lightgreen',
        prefix: 'fa'
      });
    }
    case (eventType === 'entertainment'): {
      return L.AwesomeMarkers.icon({
        icon: 'television',
        markerColor: 'green',
        prefix: 'fa'
      });
    }
    case (eventType === 'nightlife'): {
      return L.AwesomeMarkers.icon({
        icon: 'glass',
        markerColor: 'pink',
        prefix: 'fa'
      });
    }
    case (eventType === 'dining'): {
      return L.AwesomeMarkers.icon({
        icon: 'cutlery',
        markerColor: 'purple',
        prefix: 'fa'
      });
    }
    case (eventType === 'coffee'): {
      return L.AwesomeMarkers.icon({
        icon: 'cutlery',
        markerColor: 'lightred',
        prefix: 'fa'
      });
    }
    case (eventType === 'special'): {
      return L.AwesomeMarkers.icon({
        icon: 'star',
        markerColor: 'red',
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
  markerColor: 'blue',
  prefix: 'fa'
});

