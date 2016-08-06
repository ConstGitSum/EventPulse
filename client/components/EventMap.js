import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCurrentEvent } from '../actions/actions';

export class EventMap extends React.Component {
  componentDidMount() {
    this._buildMap();
  }

  _buildMap() {
    var map = L.map('list-map');

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'dark-v9',
      accessToken: 'pk.eyJ1Ijoia3Rvcm5nIiwiYSI6ImNpcmV3MXJqMzAwNWVnNW5rd3FhcXBjdnEifQ.bqImLTKsAkcFhtMsNSyDIw'
    }).addTo(map);
    map.locate({setView: true, maxZoom: 16});
    map.on('locationfound', this._onLocationFound.bind(map));
    map.on('locationerror', this._onLocationError.bind(map));
  }

  _onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng)
      .addTo(this)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(this);
  }

  _onLocationError(e) {
      alert(e.message);
  }

  render() {
    return (
      <div id="list-map"></div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    list: state.list,
    listFiltered: state.listFiltered
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    setCurrentEvent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMap);
