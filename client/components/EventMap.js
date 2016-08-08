import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setCurrentEvent } from '../actions/actions';
import markers from '../utils/markers';

export class EventMap extends React.Component {
  componentDidMount() {
    console.log(process.env)
    this._buildMap();
  }

  componentDidUpdate() {
    console.log(markers)
    console.log(this.props.listFiltered)
    this.props.listFiltered.forEach(e => {
      L.marker(
        [e.latitude, e.longitude], 
        { icon: markers.entertainment }
      )
      .addTo(this.map);
    });
  }

  _buildMap() {
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'dark-v9',
      accessToken: 'pk.eyJ1Ijoia3Rvcm5nIiwiYSI6ImNpcmV3MXJqMzAwNWVnNW5rd3FhcXBjdnEifQ.bqImLTKsAkcFhtMsNSyDIw'
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

    L.marker(e.latlng)
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
