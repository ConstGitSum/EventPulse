import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStore} from 'redux'; 

export default class Lists extends Component {
	constructor(props){
		super(props); 
		this.showList = this.showList.bind(this);
	}

	showList (index, event)  {
		this.props.dispatch(showListAction(index, event.target.value));
	}

	render(){
		const {lists, showList} = this.props;

		return (
			<div>
				<table>
					<tbody>
					{map(lists, (list, index) => {
	          return (
	          	<tr key={index}>
	            	<td><input onChange={this.showList.bind(null, index)} type="text" value={list} /></td>
	          	</tr>);	
          })}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		lists: state.lists,
	}
}

const showListAction = () => {
        return {
          type: 'SHOW_LIST',
        }
      }

const appReducer = (state = {lists: []}, action) => {

        let lists = state.lists.slice(); // Nice hack to truely clone an array without reference
        // This is quite a common way of deciding which event to process
        // Note: ALL events will be coming through this reducer
        console.log('Actions', action); // Open your console to see what actions look like
        // Even better, install Redux DevTools and your mind will be blown
        switch (action.type) {
          case 'SHOW_LIST':
            lists.push('') // Add an extra element to lists
            break;

        }
        // As above, we have to return a new state object each time (Redux store is immutable)
        // It makes sure we know our data can only be modified in one visible way
        // Also lets us time travel through our application state!
        const newState = {
          lists: lists,
        }
        console.log('Current State', newState);
        return newState;
      }

let store = createStore(appReducer, {
        items: []
})


const ListApp = connect(mapStateToProps)(Lists); 
	
