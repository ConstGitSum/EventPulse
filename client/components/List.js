import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Cell } from 'react-pure';

import { 
  userLogOut, 
  getList, 
  setCurrentEvent, 
  getHiddenEvents,
  filterList 
} from '../actions/actions';
import ListFilter from './ListFilter';

export class List extends React.Component {
  componentDidMount() {
    this.props.getHiddenEvents(this.props.currentUser.id)
    .then(() => this.props.getList())
    .then(() => this.props.filterList(
      this.props.list,
      'unhidden',
      this.props.currentUser.id,
      this.props.hiddenEvents
    ))
    .then(() => this.buildMap());
  }

  buildMap() {
    var map = L.map('list-map');

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'dark-v9',
      accessToken: 'pk.eyJ1Ijoia3Rvcm5nIiwiYSI6ImNpcmV3MXJqMzAwNWVnNW5rd3FhcXBjdnEifQ.bqImLTKsAkcFhtMsNSyDIw'
    }).addTo(map);
    map.locate({setView: true, maxZoom: 16});
    map.on('locationfound', this.onLocationFound.bind(map));
    map.on('locationerror', this.onLocationError.bind(map));
  }

  onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng)
      .addTo(this)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(this);
  }

  onLocationError(e) {
    alert(e.message);
  }

  renderListItem(event, index) {
    return <li 
      key={index} 
      className="event-item list-group-item" 
      onClick={this.props.setCurrentEvent.bind(null, event)}>
      <h3>{event.title}</h3>
        {/* Show additional info if clicked */}
        {this.props.currentEvent && event.id === this.props.currentEvent.id
        ? <div id="event-info">
            <h4 id="event_location">{event.location}</h4>
            <p id="event_description">{event.description}</p>
            <Link to={`/${event.id}`}>
              <button className="view-details btn btn-secondary">
                View Event Details
              </button>
            </Link>
          </div>
        : null}
    </li>
  }

  render() {
    return (
      <div className="explore">
        <h1>Explore</h1>
        <div id="list-map"></div>

        <ListFilter />

        <h1 id="explore">Explore</h1>
        <ul className="event-list list-group">
          {this.props.listFiltered.map((event, index) =>
            this.renderListItem(event, index))}
        </ul>

        <Link to="/create">
          <button className="create-event pure-button-primary">
            Create
          </button>
        </Link>
        <button 
          className="logout btn btn-danger" 
          onClick={this.props.userLogOut}> 
          Log Out
        </button>         
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
    list: state.list,
    listFiltered: state.listFiltered,
    hiddenEvents: state.hiddenEvents
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    setCurrentEvent,
    getHiddenEvents,
    getList,
    filterList,
    userLogOut
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
