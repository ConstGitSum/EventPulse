import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import L from 'leaflet';
import equal from 'deep-equal';

import { setCurrentEvent } from '../actions/actions';
import { setCurrMarker, setPrevMarker } from '../actions/map';
import generateMarker, { userMarker, alertMarker } from '../utils/markers';

export class EventMap extends React.Component {
  componentDidMount() {
    // initialize an object to track leaflet markers for each event shown
    this.markerTracker = {};
    this._buildMap();
  }

  componentDidUpdate(prevProps, prevState) {
    // if filtered event list has changed, redraw markers
    if (!equal(prevProps.listFiltered, this.props.listFiltered)) this._drawMarkers();

    // if current event has changed, locate marker and set to currentMarker
    if (prevProps.currentEvent !== this.props.currentEvent && !equal(this.props.currentEvent, {})) {
      this._alertCurrentMarker(this.markerTracker[this.props.currentEvent.id], this.props.currentEvent);
    }
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
    this._drawMarkers();

    this.map.locate();
    this.map.on('locationfound', this._onLocationFound.bind(this));
    this.map.on('locationerror', this._onLocationError.bind(this));
  }

  _drawMarkers() {
    // clear existing markers before adding new markers for updated list
    this._clearMarkers();

    this.props.listFiltered.forEach(event => {
      const latlng = [event.latitude, event.longitude];
      const marker = L.marker(latlng, { icon: generateMarker(event.category) })
        .addTo(this.map);

      marker.on('click', this.props.setCurrentEvent.bind(this, event))

      this.markerTracker[event.id] = marker;
    });
  }

  // clear all current markers on map 
  // clear state of currMarker, prevMarker, and currentEvent
  _clearMarkers() {
    for (let id in this.markerTracker) this.map.removeLayer(this.markerTracker[id]);
    this.markerTracker = {};
    this.props.setCurrMarker({});
    this.props.setPrevMarker({});
    this.props.setCurrentEvent({});
  }

  // set the marker for selected current event to spinning '!' marker
  _alertCurrentMarker(marker, event) {
    // if a currMarker already exists, revert it back to original marker
    if (this.props.map.currMarker.eventId) {
      const curr = this.props.map.currMarker;
      const prev = this.props.map.prevMarker;
      this.map.removeLayer(curr.marker);
      prev.marker.addTo(this.map);
      this.markerTracker[curr.eventId] = prev.marker;
    }

    // set this marker as the new prevMarker, and add new '!' marker as currMarker
    this.map.removeLayer(marker);
    const newMarker = L.marker(marker._latlng, { icon: alertMarker }).addTo(this.map);
    this.props.setPrevMarker({marker: marker, eventId: event.id });
    this.props.setCurrMarker({marker: newMarker, eventId: event.id });
    this.props.setCurrentEvent(event);
    this.markerTracker[event.id] = newMarker;

    // pan map to new current event
    this.map.setView(marker._latlng, 16, { animate: true, duration: 1.0 });
  }

  _onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng, { icon: userMarker })
      .addTo(this.map)
      .bindPopup("You are within " + radius + " meters from this point");

    L.circle(e.latlng, radius).addTo(this.map);

    this.map.setView(e.latlng, 16, { animate: true, duration: 1.0 });
  }

  _onLocationError(e) {
      alert(e.message);
  }

  render() {
    return (
      <div className="col-xs-8" id="list-map"></div>
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
