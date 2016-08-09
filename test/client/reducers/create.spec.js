import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_create';

describe('create Reducer', () => {

  it('should handle VALIDATE_EVENT_FORM', () => {
    const initialState = {
      title: 'moreThanTenWords',
      description: 'description',
      location: '751 street',
      hour: 4,
      minute: 40,
      ampm: 'am',
      duration_hour: 0,
      duration_minute: 0,
      privacy: 'false',
      group_visibility: 1,
      max_guests: 0,
      is_tomorrow: false
    };
    const action = {
      type: 'VALIDATE_EVENT_FORM',
      payload: {
        title: 'moreThanTenWords',
        description: 'description',
        location: '751 street',
        hour: 4,
        minute: 40,
        ampm: 'am',
        duration_hour: 0,
        duration_minute: 0,
        privacy: 'false',
        group_visibility: 1,
        max_guests: 0,
        is_tomorrow: false
      }
    }
    const nextState = reducer(initialState, action);
    console.log('33333~~~nextState',nextState )
    expect(nextState).to.deep.equal({ id: 1, guests: [] });
  });

  xit('should handle UPDATE_EVENT_FIELD', () => {
    const initialState = {
      title: 'oldTitle'
    };
    const action = {
      type: 'VALIDATE_EVENT_FORM',
      payload: {
        title: 'newTitle'
      }
    }
    const nextState = reducer(initialState, action);
    //console.log('33333~~~nextState',nextState )
    expect(nextState).to.deep.equal({ title: 'newTitle'});
  });

  it('should handle CLEAR_FORM_VALUES', () => {
    const initialState = {
      title: 'moreThanTenWords',
      description: 'description',
      location: '751 street',
      hour: 4,
      minute: 40,
      ampm: 'am',
      duration_hour: 0,
      duration_minute: 0,
      privacy: 'false',
      group_visibility: 1,
      max_guests: 0,
      is_tomorrow: false
    };
    const action = {
      type: 'CLEAR_FORM_VALUES'
    }
    const nextState = reducer(initialState, action);
    const today = new Date();
    let currHour = today.getHours();
    let currMinute = today.getMinutes();
    expect(nextState).to.deep.equal(
        {
          eventFormData: {
            title: '',
            description: '',
            location: '',
            hour: currHour > 12 ? currHour - 12: currHour,
            minute: currMinute,
            ampm: currHour > 12 ? 'pm': 'am',
            duration_hour: 0,
            duration_minute: 0,
            privacy: 'false',
            group_visibility: 1,
            max_guests: 0,
            is_tomorrow: false
          },
          validationErrors: {}
        }
      );
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    const today = new Date();
    let currHour = today.getHours();
    let currMinute = today.getMinutes();
    expect(nextState).to.deep.equal(
        {
          eventFormData: {
            title: '',
            description: '',
            location: '',
            hour: currHour > 12 ? currHour - 12: currHour,
            minute: currMinute,
            ampm: currHour > 12 ? 'pm': 'am',
            duration_hour: 0,
            duration_minute: 0,
            privacy: 'false',
            group_visibility: 1,
            max_guests: 0,
            is_tomorrow: false
          },
          validationErrors: {}
        }
      );
  });

});
