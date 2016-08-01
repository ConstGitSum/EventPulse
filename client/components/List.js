import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {createStore} from 'redux'; 
import axios from 'axios';

export default class Lists extends React.Component {
	constructor(props){
		super(props); 
		this.state = {
			events: [],
			txt: ''
		}
	}

	componentDidMount(){
		axios.get('/api/events').then((eventData) => {
			console.log('~~eventData~~~', eventData.data);
			this.setState({events: eventData.data})
    	})
	}
	
	handleCreate(){
		this.setState({txt: '~~~Need a router~~~'});
	}

	render(){
		return (
			<div className='event_items'>
				<h5>Events Happening!</h5>
					{this.state.events.map((event, index) => {
						return ( 
						<ul key={index} className="events">
							<li>{"What's happening " + event.title}</li>
							<li>{"Where? " + event.location}</li>
							<li>{"What are we goin to do? "+ event.description}</li>
						</ul>
						)
					})}
				<button onClick={this.handleCreate.bind(this)} className='create_event'>Create</button>
				<span>{this.state.txt}</span>
			</div>
		)
	}
}

