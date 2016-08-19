import React from 'react';
import { connect } from 'react-redux';
import L from 'leaflet';

import generateMarker, { userMarker } from '../utils/markers';

export class DetailsMap extends React.Component {
  componentDidMount() {
    this._buildMap();
  }

  _buildMap() {
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      maxZoom: 18,
      id: 'light-v9',
      accessToken: process.env.MAP_API_KEY,
    });

    this.map = L.map('details-map', {
      layers: [tiles],
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      tap: false
    });

    const eventLatLng = [this.props.currentEvent.latitude, this.props.currentEvent.longitude];
    const userLatLng = [this.props.location.lat, this.props.location.lng];
    const eventMarker = L.marker(eventLatLng, { icon: generateMarker(this.props.currentEvent.category) })
    const locationMarker = L.marker(userLatLng, { icon: userMarker });
    const group = new L.featureGroup([eventMarker, locationMarker]).addTo(this.map);

    this.map.fitBounds(group.getBounds().pad(0.5));
  }

  render() {
    return (
      <div id="details-map" className="col-xs-10 col-xs-offset-1"></div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    location: state.map.currLocation
  };
}

/* istanbul ignore next */
export default connect(mapStateToProps)(DetailsMap);
