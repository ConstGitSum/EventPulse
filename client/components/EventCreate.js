import React from 'react';
import { createEvent } from '../actions/actions';

export default class EventCreate extends React.Component {
constructor(props){
    super(props)
    this.state={title: "", description: "", location: "", date: "", duration: "", guests: "", privacy: true, visibility: ""}  //by default, filter should go to Any
    }
render(){
  return(
    <div className='container'>
        <h3>Create New Event</h3>
        <form role = 'form'>
        <div class="form-group">       
          <input type = "text" name="title" type="text"  placeholder="Event title" value = {this.state.title} onChange = {this.keyStroke.bind(this)}/>
          </div>
          <div class="form-group">
          <input type = "text" name="description" type="text" placeholder="Description" value = {this.state.description} onChange = {this.keyStroke.bind(this)}/>
          </div>
          <div class="form-group">
          <input type = "text" name="location" type="text" placeholder="Location" value = {this.state.location} onChange = {this.keyStroke.bind(this)}/>
          </div>
          <div class="form-group">
          <input type = "text" name="date" type="datetime-local" placeholder="Date" value = {this.state.date} onChange = {this.keyStroke.bind(this)}/>
          </div>
          <div class="form-group">
          <input type = "text" name="duration" type="number" placeholder="Duration" value = {this.state.duration} onChange = {this.keyStroke.bind(this)}/>
          </div>
          <div class="form-group">
          <input type = "text" name="guests" type="number" placeholder="Number of guests" value = {this.state.guests} onChange = {this.keyStroke.bind(this)}/>
          </div>
          <br/>
          <label>Privacy</label>
          <div>
            <label><input name="privacy" component="input" type="radio" value="false"/> public</label>
            <br/>
            <label><input name="privacy" component="input" type="radio" value="true"/> private</label>
          </div>
          <label>Visibility</label>
          <div>
            <label><input name="visibility" component="input" type="radio" value="1"/> group1</label>
          </div>
          <div>
            <button type="submit" className='btn btn-primary'> submit </button>
            <button type="button" className='btn btn-primary' >Clear Values</button>
          </div>
        </form>
      </div>


    )
}
keyStroke(event){
console.log(event.target,"HEHHEH",event.target.value)
this.setState({[event.target.name]:event.target.value})
}
}
