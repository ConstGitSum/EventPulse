import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import {
  createEvent,
  setCurrentEvent,
  validateEventForm,
  updateEventField,
  clearFormValues,
  updateEvent,
  deleteUpdateData } from '../actions/actions';

export class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationError: false,
      folded: true,
    };

    this.onSubmitRedux = this.onSubmitRedux.bind(this);
    this.onFieldChangeRedux = this.onFieldChangeRedux.bind(this);
    this.onNoGuestLimit = this.onNoGuestLimit.bind(this);
    this.onClearValues = this.onClearValues.bind(this);
    this.onMoreOptions = this.onMoreOptions.bind(this);
  }
  componentWillMount() {
    if (!this.props.currentUser) {
      browserHistory.push('/');
    }
  }
  // runs when user clicks on create button
  // this function creates or updates event
  onSubmitRedux(event) {
    event.preventDefault();
    this.setState({ locationError: false });
    this.props.validateEventForm(validationErrors => {
      // create or update event if there is no validation errors
      // after successfully updating/creating event,
      // clears form values and redirects user to the event detail page
      if (Object.keys(validationErrors).length === 0) {
        if (this.props.toggleEventUpdate) {
          this.props.updateEvent(
            this.props.eventFormData,
            this.props.currentUser,
            this.props.currentEvent.id
          )
            .then(res => {
              if (res.error) throw new Error('Unable to update event');
              this.props.clearFormValues();
              browserHistory.push(`/${this.props.currentEvent.id}`);
            })
            .catch(() => {
            });
        } else {
          this.props.createEvent(this.props.eventFormData, this.props.currentUser)
            .then(res => {
              if (res.error) { throw new Error('Unable to create event'); }
              this.props.clearFormValues();
              browserHistory.push(`/${this.props.currentEvent.id}`);
            })
            .catch(() => {
              this.setState({ locationError: true });
            });
        }
      }
    });
  }
  // runs when user enters values into any fields
  onFieldChangeRedux(event) {
    this.props.updateEventField(event.target.name, event.target.value);
  }
  // runs when user toggles no capacity limit checkbox
  onNoGuestLimit(event) {
    if (event.target.checked) {
      this.props.updateEventField('max_guests', -1);
    } else {
      this.props.updateEventField('max_guests', 1);
    }
  }
  // clears out all input values and validation errors
  onClearValues() {
    this.props.clearFormValues();
  }
  // expands and collapses the optional section of form
  onMoreOptions() {
    if (this.state.folded) {
      this.setState({ folded: false });
    } else {
      this.setState({ folded: true });
    }
    setTimeout(() => $('.create-form').scrollTo(300, 50));
  }
  // determines which button to show: Update or Create
  generateButton() {
    if (this.props.toggleEventUpdate) {
      return (
        <button
          type="submit"
          className="btn btn-primary col-xs-offset-1 col-xs-10"
          role="button"
          onClick={this.onSubmitRedux}
        >
          Update
        </button>
      );
    }

    return (
      <button
        type="submit"
        className="create btn btn-primary col-xs-offset-1 col-xs-10"
        role="button"
        onClick={this.onSubmitRedux}
      >
        Create
      </button>
    );
  }

  render() {
    const { validationErrors, eventFormData } = this.props;

    return (
      <div className="event-create">
        {/* back button redirects user to the homepage */}
        <Link to="/">
          <i
            onClick={this.onClearValues}
            className="back-btn fa fa-arrow-left fa-3x"
            aria-hidden="true"
          />
        </Link>
        <div className="container">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 page-header">
              {this.props.toggleEventUpdate
                ? <h1 className="row text-center"> Update Pulse</h1>
                  : <h1 className="row text-center">New Pulse</h1>
                }
            </div>
          </div>
          <div className="scroll">
            {/* clear Values button */}
            <div className="row text-right col-xs-12">
              <button
                type="button"
                className="clear btn-link"
                role="button"
                onClick={this.onClearValues}
              >
                Clear Values
              </button>
            </div>
            {/* form starts here */}
            <form role="form" className="create-form">
              <div className="required">
                <div className="form-group col-xs-10 col-xs-offset-1">
                  <label className="col-xs-12 col-sm-4" htmlFor="title">Title*</label>
                  <input
                    className="col-xs-12 col-sm-8 input-sm"
                    type="text"
                    name="title"
                    placeholder="Event title"
                    value={eventFormData.title}
                    onBlur={this.onFieldChangeRedux}
                    onChange={this.onFieldChangeRedux}
                  />

                  {validationErrors.title
                    ? <div className="text-danger col-sm-8 errors">{validationErrors.title}</div>
                    : null
                  }
                </div>
                <div className="form-group col-xs-10 col-xs-offset-1">
                  <label className="col-xs-12 col-sm-4" htmlFor="location">Location*</label>
                  <input
                    className="col-xs-12 col-sm-8 input-sm"
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={eventFormData.location}
                    onBlur={this.onFieldChangeRedux}
                    onChange={this.onFieldChangeRedux}
                  />
                  <div className="col-xs-12 errors">
                    {validationErrors.location
                      ? <div className="text-danger col-sm-8 errors"> {validationErrors.location} </div>
                      : null
                    }
                  </div>
                </div>

                <div className="form-group col-xs-10 col-xs-offset-1">
                  <label className="col-xs-12 col-sm-4" htmlFor="category">Category*</label>
                  <div className="col-xs-12 col-sm-8 no-padding-left no-padding-right">
                    <select
                      name="category"
                      className="form-control"
                      value={eventFormData.category}
                      onBlur={this.onFieldChangeRedux}
                      onChange={this.onFieldChangeRedux}
                    >
                      { [
                        'athletics',
                        'entertainment',
                        'nightlife',
                        'music',
                        'dining',
                        'coffee',
                        'olympics',
                        'other',
                      ].map((h) => <option key={h} value={h}>{h}</option>) }
                      )}
                    </select>
                  </div>
                </div>
                <div className="form-group col-xs-10 col-xs-offset-1">
                  <label className="col-xs-12 col-sm-4" htmlFor="time">Time*</label>
                  <div className="col-xs-4 col-sm-2 no-padding-left">
                    <select
                      name="hour"
                      className="form-control"
                      value={eventFormData.hour}
                      onBlur={this.onFieldChangeRedux}
                      onChange={this.onFieldChangeRedux}
                    >
                      { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                        .map((h) => <option key={h} value={h}>{h}</option>)
                      })}
                    </select>
                  </div>
                  <div className="col-xs-4 col-sm-2 no-padding-left">
                    <select
                      name="minute"
                      className="form-control"
                      value={eventFormData.minute}
                      onBlur={this.onFieldChangeRedux}
                      onChange={this.onFieldChangeRedux}
                    >
                      { ['00', '10', '20', '30', '40', '50']
                        .map((minute) => <option key={minute} value={minute}>{minute}</option>)
                      })}
                    </select>
                  </div>
                  <div className="col-xs-4 col-sm-2 no-padding-left">
                    <select
                      name="ampm"
                      className="form-control"
                      value={eventFormData.ampm}
                      onBlur={this.onFieldChangeRedux}
                      onChange={this.onFieldChangeRedux}
                    >
                      <option value="am">am</option>
                      <option value="pm">pm</option>
                    </select>
                  </div>
                  <div className="col-xs-12 col-sm-2 no-padding-left is-tomorrow">
                    <select
                      name="is_tomorrow"
                      className="form-control"
                      value={eventFormData.is_tomorrow}
                      onBlur={this.onFieldChangeRedux}
                      onChange={this.onFieldChangeRedux}
                    >
                      <option value="false">today</option>
                      <option value="true">tomorrow</option>
                    </select>
                  </div>
                  <div className="col-xs-12 no-padding-left">
                    <div className="col-xs-12 col-sm-8">
                      {validationErrors._time
                        ? <div className="text-danger errors"> {validationErrors._time} </div>
                        : null}
                    </div>
                  </div>
                </div>
              </div>
              {/* more Options button expands and collapses optional fields */}
              <div className="form-group text-center more-option">
                <button
                  type="button"
                  className="btn btn-link"
                  role="button"
                  onClick={this.onMoreOptions}
                >
                  {this.state.folded
                    ? <span className="more-option-btn">More Options</span>
                    : <span>Less Options</span>
                  }
                </button>
              </div>
                {/* do not display if this.state.folded is true */}
                {this.state.folded
                  ? null
                  : <div>
                      <div className="form-group col-xs-10 col-xs-offset-1">
                        <label
                          className="col-xs-12 col-sm-4 more-label"
                          htmlFor="duration"
                        >Duration
                        </label>
                        <div>
                          <div className="row duration">
                            <div className="col-xs-4 col-sm-2 no-padding-left">
                              <select
                                name="duration_hour"
                                className="form-control"
                                value={eventFormData.duration_hour}
                                onBlur={this.onFieldChangeRedux}
                                onChange={this.onFieldChangeRedux}
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                                  .map((h) => <option key={h} value={h}>{h}</option>)
                                }
                              </select>
                            </div>
                            <div className="col-xs-4 col-sm-2 no-padding-left">
                              <select
                                name="duration_minute"
                                className="form-control"
                                value={10 * Math.ceil(eventFormData.duration_minute / 10)}
                                onBlur={this.onFieldChangeRedux}
                                onChange={this.onFieldChangeRedux}
                              >
                                {['00', '10', '20', '30', '40', '50'].map((minute) =>
                                  <option key={minute} value={minute}>{minute}</option>
                                )}}
                              </select>
                            </div>
                          </div>
                          <div className="col-xs-12 errors">
                            {validationErrors._duration
                              ? <div className="text-danger col-sm-8 errors"> {validationErrors._duration}</div>
                              : null
                            }
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-xs-10 col-xs-offset-1">
                        <label className="col-xs-12 col-sm-4" htmlFor="capacity">Capacity</label>
                        {(eventFormData.max_guests === -1)
                          ? null
                          : (<input
                            className="col-xs-8 col-sm-2 input-sm capacity"
                            name="max_guests"
                            type="number"
                            placeholder="capacity"
                            value={Number(eventFormData.max_guests)}
                            onBlur={this.onFieldChangeRedux}
                            onChange={this.onFieldChangeRedux}
                            min="1"
                          />)
                        }
                        <label htmlFor="nolimit">
                          <input
                            className="form-check-input"
                            name="noLimit"
                            type="checkbox"
                            value={-1}
                            checked={eventFormData.max_guests === -1}
                            onChange={this.onNoGuestLimit}
                          />
                          <span className="form-check-label"> No capacity limit</span>
                        </label>
                        <div className="col-xs-12 errors">
                          {validationErrors.max_guests
                            ? <div className="text-danger col-sm-8 errors"> {validationErrors.max_guests} </div>
                            : null
                          }
                        </div>
                      </div>
                    <div className="form-group col-xs-10 col-xs-offset-1">
                      <label className="col-xs-12 col-sm-4" htmlFor="privacy">Privacy</label>
                      <div className="col-xs-12 col-sm-8 privacy-radio">
                        <label htmlFor="privacy-radio">
                          <input
                            className="form-check-input"
                            name="privacy"
                            type="radio"
                            value="false"
                            checked={eventFormData.privacy === 'false'}
                            onChange={this.onFieldChangeRedux}
                          />
                          <span className="form-check-label"> Public</span>
                        </label>
                        <label htmlFor="privacy-radio">
                          <input
                            className="form-check-input"
                            name="privacy"
                            type="radio"
                            value="true"
                            checked={eventFormData.privacy === 'true'}
                            onChange={this.onFieldChangeRedux}
                          />
                          <span className="form-check-label"> Friends only</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-xs-10 col-xs-offset-1">
                      <label className="col-xs-12 col-sm-4 desc-label" htmlFor="description">Description</label>
                      <input
                        className="col-xs-12 col-sm-8 input-sm"
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={eventFormData.description}
                        onBlur={this.onFieldChangeRedux}
                        onChange={this.onFieldChangeRedux}
                      />
                      <div className="col-xs-12 errors">
                        {validationErrors.description
                          ? <div className="text-danger col-sm-8 errors"> {validationErrors.description} </div>
                          : null
                        }
                      </div>
                    </div>
                </div>
                }
            </form>
          </div>
          <div className="footer">
            <div className="row">
              <div className="col-xs-12 submit">
                {this.generateButton()}
              </div>
            </div>
            {/* Display validation errors and create/update buttons */}
            <div className="col-xs-10 col-xs-offset-1 text-center">
              {validationErrors._form
                ? <div className="text-danger summary"> {validationErrors._form} </div>
                : null
              }
              {this.state.locationError
                ? <div className="text-danger summary"> Form submission failed: invalid location </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  currentUser: PropTypes.object.isRequired,
  validateEventForm: PropTypes.func.isRequired,
  toggleEventUpdate: PropTypes.bool,
  eventFormData: PropTypes.object.isRequired,
  validationErrors: PropTypes.object,
  updateEventField: PropTypes.func,
  createEvent: PropTypes.func,
  currentEvent: PropTypes.object,
  clearFormValues: PropTypes.func,
  updateEvent: PropTypes.func,
};

// istanbul ignore next
function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
    validationErrors: state.create.validationErrors,
    eventFormData: state.create.eventFormData,
    toggleEventUpdate: state.create.toggleEventUpdate,
  };
}

// istanbul ignore next
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createEvent,
    setCurrentEvent,
    validateEventForm,
    updateEventField,
    clearFormValues,
    updateEvent,
    deleteUpdateData }, dispatch);
}

// istanbul ignore next
export default connect(mapStateToProps, mapDispatchToProps)(Create);
