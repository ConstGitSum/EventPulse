exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('messages').del(), // Deletes ALL existing entries
    knex('guests').del(),
    knex('events').del(),
    knex('memberships').del(),
    knex('groups').del(),
    knex('users').del()
  ])
    .then(() => { // Inserts seed entries one by one in series
      return knex('users').insert({
        name: 'Alice',
        email: 'alice@gmail.com',
        image: 'https://imageurl',
        facebook_id: '12104755554605551',
      });
    })
    .then(() => {
      return knex('users').insert({
        name: 'Bob',
        email: 'bob@gmail.com',
        image: 'https://imageurl',
        facebook_id: '12104755554605552',
      });
    })
    .then(() => {
      return knex('groups').insert({
        name: 'ConstGitSum',
      });
    })
    .then(() => {
      return knex('memberships').insert([{
        user_id: 1,
        group_id: 1,
        rank: 'admin'
      },{
        user_id: 2,
        group_id: 1,
        rank: 'member'
      }]);
    })
    .then(() => {
      return knex('events').insert({
        title: 'Pokemongodb party',
        description: 'Catch pokemon and do some coding',
        created_by: 1,
        location: '701 Brazos St, Austin, TX 78701',
        latitude: 30.2688755, 
        longitude: -97.7405641,
        time: '2016-08-30T08:00:00.000',
        duration: 10800,
        privacy: false
      });
    })
    .then(() => {
      return knex('events').insert({
        title: 'Pick-up basketball game',
        description: 'A friendly game of basketball',
        created_by: 2,
        location: '2100 Alamo St, Austin, TX 78722',
        latitude: 30.2770933, 
        longitude: -97.7185537,
        time: '2016-08-30T10:00:00.000',
        max_guests: 10,
        duration: 3600,
        privacy: false
      });
    })
    .then(() => {
      return knex('guests').insert([{
        user_id: 1,
        event_id: 1,
        status: 'accepted'
      }, {
        user_id: 2,
        event_id: 2,
        status: 'accepted'
      }]);
    })
    .then(() => {
      return knex('messages').insert({
        user_id: 1,
        event_id: 1,
        text: 'Zubats everywhere'
      });
    });
};
