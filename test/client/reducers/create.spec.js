import { expect } from 'chai';

import reducer from '../../../client/reducers/reducer_create';

describe('Create Reducer', () => {
  const TEN_MINUTE = 10 * 60 * 1000;
  const today = new Date();
  const todayInTens = new Date(TEN_MINUTE * Math.ceil(today.getTime()/TEN_MINUTE));
  let currHour = todayInTens.getHours();
  let currMinute = todayInTens.getMinutes();
  let initialState;

  beforeEach(() => {
    // populate initial state of event form with 1 hour in the future
    initialState = {
      eventFormData: {
        title: 'moreThanTenWords',
        description: 'description',
        location: '751 street',
        hour: currHour > 11 ? currHour - 11: currHour + 1,
        minute: currMinute,
        ampm: currHour > 12 ? 'pm': 'am',
        duration_hour: 1,
        duration_minute: 0,
        category: 'other',
        privacy: 'false',
        group_visibility: 1,
        max_guests: -1,
        is_tomorrow: false
      },
      validationErrors: {}
    };
  })

  describe('should handle VALIDATE_EVENT_FORM', () => {
    const action = { type: 'VALIDATE_EVENT_FORM' };

    it('should throw validation error for empty title', (done) => {
      initialState.eventFormData.title = '';
      const nextState = reducer(initialState, action);
      expect(Object.keys(nextState.validationErrors).length).to.not.equal(0);
      expect(nextState.validationErrors.title).to.equal('title cannot be empty');
      done();
    });

    it('should throw validation error for empty location', (done) => {
      initialState.eventFormData.location = '';
      const nextState = reducer(initialState, action);
      expect(Object.keys(nextState.validationErrors).length).to.not.equal(0);
      expect(nextState.validationErrors.location).to.equal('location cannot be empty');
      done();
    });
  });

  it('should handle CLEAR_FORM_VALUES', (done) => {
    const action = { type: 'CLEAR_FORM_VALUES' };
    const nextState = reducer(initialState, action);
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
