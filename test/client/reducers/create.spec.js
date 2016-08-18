import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_create';

describe.only('Create Reducer', () => {
  const initialState = {
    eventFormData: {
      title: 'moreThanTenWords',
      description: 'description',
      location: '751 street',
      hour: 0,
      minute: 40,
      ampm: 'am',
      duration_hour: 0,
      duration_minute: 0,
      category: 'other',
      privacy: 'false',
      group_visibility: 1,
      max_guests: -1,
      is_tomorrow: false
    },
    validationErrors: {}
  };

  describe('should handle VALIDATE_EVENT_FORM', (done) => {
    const action = { type: 'VALIDATE_EVENT_FORM' };
    const nextState = reducer(initialState, action);
    console.log(nextState)
  })

  it('should handle CLEAR_FORM_VALUES', (done) => {
    const action = { type: 'CLEAR_FORM_VALUES' };
    const nextState = reducer(initialState, action);
    const TEN_MINUTE = 10 * 60 * 1000;
    const today = new Date();
    const todayInTens = new Date(TEN_MINUTE * Math.ceil(today.getTime()/TEN_MINUTE));
    let currHour = todayInTens.getHours();
    let currMinute = todayInTens.getMinutes();
    expect(nextState).to.deep.equal(
      {
        eventFormData: {
          title: '',
          description: '',
          duration: 0,
          duration_hour: 0,
          duration_minute: 0,
          endTime: '',
          location: '',
          hour: currHour > 12 ? currHour - 12: currHour,
          minute: currMinute,
          ampm: currHour > 12 ? 'pm': 'am',
          category: 'other',
          privacy: 'false',
          max_guests: -1,
          is_tomorrow: false
        },
        validationErrors: {}
      }
    );
    done();
  });

  it('should have an initial state', () => {
    const action = {
      type: 'TEST',
    }
    const nextState = reducer(undefined, action);
    const TEN_MINUTE = 10 * 60 * 1000;
    const today = new Date();
    const todayInTens = new Date(TEN_MINUTE * Math.ceil(today.getTime()/TEN_MINUTE));
    let currHour = todayInTens.getHours();
    let currMinute = todayInTens.getMinutes();
    expect(nextState).to.deep.equal(
        {
          eventFormData: {
            title: '',
            description: '',
            location: '',
            hour: currHour > 12 ? currHour - 12: currHour,
            minute: currMinute,
            ampm: currHour > 12 ? 'pm': 'am',
            duration: 0,
            duration_hour: 0,
            duration_minute: 0,
            endTime: '',
            category: 'other',
            privacy: 'false',
            max_guests: -1,
            is_tomorrow: false
          },
          validationErrors: {}
        }
      );
  });
});
