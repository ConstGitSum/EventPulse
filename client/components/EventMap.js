import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import L from 'leaflet';
import equal from 'deep-equal';

import { setCurrentEvent } from '../actions/actions';
import { setCurrMarker, setPrevMarker } from '../actions/map';
import generateMarker, { userMarker, currentMarker } from '../utils/markers';

export class EventMap extends React.Component {
  componentDidMount() {
    this.markers = [];
    this._buildMap();
  }

  componentDidUpdate(prevProps, prevState) {
    // if filtered event list has changed, redraw markers
    if (!equal(prevProps.listFiltered, this.props.listFiltered)) this._redrawMarkers();

    // if current event has changed, locate marker and set to currentMarker
    if (prevProps.currentEvent !== this.props.currentEvent) {
      console.log('current event has changed');
      console.log(this.markers);
    }
  }

  _redrawMarkers() {
    // clear existing markers before adding new markers for updated list
    this._clearMarkers();

    this.props.listFiltered.forEach(event => {
      const latlng = [event.latitude, event.longitude];
      const marker = L.marker(latlng, { icon: generateMarker(event.type) })
        .addTo(this.map);

      marker.on('click', this._onClickMarker.bind(this, marker, event))

      this.markers.push(marker);
    });
  }

  _clearMarkers() {
    this.markers.forEach(marker => { this.map.removeLayer(marker) });
    this.markers = [];
    this.currentMarker = null;
    this.prevMarker = null;
  }

  _onClickMarker(marker, event) {
    const latlng = marker._latlng;
    // if currMarker already exists, replace with prevMarker
    if (this.props.map.currMarker) {
      this.map.removeLayer(this.props.map.currMarker);
      this.props.map.prevMarker.addTo(this.map);
    }

    // set this marker as new prevMarker, and add new spinning marker as currMarker
    this.map.removeLayer(marker);
    const newMarker = L.marker(latlng, { icon: currentMarker }).addTo(this.map);

    this.props.setPrevMarker(marker);
    this.props.setCurrMarker(newMarker);
    this.props.setCurrentEvent(event);
    this.markers.push(newMarker);
  }

  _buildMap() {
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'dark-v9',
      accessToken: process.env.MAP_API_KEY
    });

    this.map = L.map('list-map', {
      layers: [tiles]
    });

    this.map.locate({setView: true, maxZoom: 16});
    this.map.on('locationfound', this._onLocationFound.bind(this));
    this.map.on('locationerror', this._onLocationError.bind(this));
  }

  _onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng, { icon: userMarker })
      .addTo(this.map)
      .bindPopup("You are within " + radius + " meters from this point");

    L.circle(e.latlng, radius).addTo(this.map);
  }

  _onLocationError(e) {
      alert(e.message);
  }

  render() {
    return (
      <div className="col-sm-8" id="list-map"></div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    listFiltered: state.listFiltered,
    currentEvent: state.currentEvent,
    map: state.map
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    setCurrentEvent,
    setCurrMarker,
    setPrevMarker
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMap);
