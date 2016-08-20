import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import L from 'leaflet';
import equal from 'deep-equal';
import $ from 'jquery';
import scrollTo from 'jquery.scrollto';

import { setCurrentEvent } from '../actions/actions';
import { setCurrMarker, setPrevMarker } from '../actions/map';
import generateMarker, { userMarker, alertMarker } from '../utils/markers';

export class EventMap extends React.Component {
  componentDidMount() {
    // initialize an object to track leaflet markers for each event shown
    this.markerTracker = {};
    this._buildMap();
  }

  componentDidUpdate(prevProps) {
    // once user is geolocated, draw user marker and center map on location
    if (!equal(prevProps.location, this.props.location)) this._onLocationFound();

    // if filtered event list has changed, redraw markers
    if (!equal(prevProps.listFiltered, this.props.listFiltered)) this._drawMarkers();

    // if current event has changed, locate marker and set to currentMarker
    if (!equal(prevProps.currentEvent, this.props.currentEvent)) {
      if (!equal(this.props.currentEvent, {})) {
        this._alertCurrentMarker(this.markerTracker[this.props.currentEvent.id], this.props.currentEvent);
      } else if (this.props.currMarker) {
        // if current event is being unset, revert current alert marker to original marker
        this._revertCurrentMarker();
      }
    }
  }

  _buildMap() {
    // Mapbox tile API using light-v9 theme
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      maxZoom: 18,
      id: 'light-v9',
      accessToken: process.env.MAP_API_KEY,
    });

    // draw map to div with id 'list-map'
    this.map = L.map('list-map', {
      layers: [tiles],
    });
    // draw markers for event list
    this._drawMarkers();

    // if current location exists, then set map center on it
    if (this.props.location) this._onLocationFound();
  }

  _drawMarkers() {
    // clear existing markers before adding new markers for updated list
    this._clearMarkers();

    this.props.listFiltered.forEach(event => {
      const latlng = [event.latitude, event.longitude];
      const marker = L.marker(latlng, { icon: generateMarker(event.category) })
        .addTo(this.map);

      marker.on('click', this.props.setCurrentEvent.bind(this, event));

      // add leaflet marker class to markerTracker object
      this.markerTracker[event.id] = marker;
    });
  }

  // clear all current markers on map
  // clear state of currMarker, prevMarker, and currentEvent
  _clearMarkers() {
    for (const id in this.markerTracker) this.map.removeLayer(this.markerTracker[id]);
    this.markerTracker = {};
    this.props.setCurrMarker({});
    this.props.setPrevMarker({});
    this.props.setCurrentEvent({});
  }

  // set the marker for selected current event to spinning '!' marker
  _alertCurrentMarker(marker, event) {
    // if a currMarker already exists, revert it back to original marker
    if (this.props.map.currMarker.eventId) this._revertCurrentMarker();

    // set this marker as the new prevMarker, and add new '!' marker as currMarker
    this.map.removeLayer(marker);
    const newMarker = L.marker(marker._latlng, { icon: alertMarker }).addTo(this.map);
    this.props.setPrevMarker({ marker, eventId: event.id });
    this.props.setCurrMarker({ marker: newMarker, eventId: event.id });
    this.props.setCurrentEvent(event);
    this.markerTracker[event.id] = newMarker;

    // pan map to new current event
    this.map.setView(marker._latlng, 16, { animate: true, duration: 1.0 });

    // find index of clicked event to scroll to it on list
    const index = this.props.listFiltered.findIndex(e => e.id === event.id);
    $('.eventList').find(`li:eq(${index})`).addClass('selected');
    setTimeout(() => $('.eventList').scrollTo(`li:eq(${index})`, 300), 300);
  }

  // revert current marker (with exclamation alert) back to original marker
  _revertCurrentMarker() {
    const curr = this.props.map.currMarker;
    const prev = this.props.map.prevMarker;
    this.map.removeLayer(curr.marker);
    prev.marker.addTo(this.map);
    this.markerTracker[curr.eventId] = prev.marker;

    // find index of prev to remove selected class from it on the list
    const prevIndex = this.props.listFiltered.findIndex(e => e.id === prev.eventId);
    $('.eventList').find(`li:eq(${prevIndex})`).removeClass('selected');
    $('.eventList').find(`li:eq(${prevIndex})`).mouseout();
  }

  // add marker to map for current user location
  _onLocationFound() {
    const latlng = [this.props.location.lat, this.props.location.lng];
    L.marker(latlng, { icon: userMarker })
      .addTo(this.map)
      .bindPopup('You are here!');

    this.map.setView(latlng, 16, { animate: true, duration: 1.0 });
  }

  render() {
    return (
      <div className="col-xs-8" id="list-map"></div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    listFiltered: state.listFiltered,
    currentEvent: state.currentEvent,
    map: state.map,
    location: state.map.currLocation,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setCurrentEvent,
    setCurrMarker,
    setPrevMarker,
  }, dispatch);
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(EventMap);
