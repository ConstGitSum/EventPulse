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
      });
    })
    .then(() => {
      return knex('users').insert({
        name: 'Bob',
        email: 'bob@gmail.com',
      });
    })
    .then(() => {
      return knex('groups').insert({
        name: 'ConstGitSum',
      });
    })
    .then(() => {
      return knex('memberships').insert({
        user1_id: 1,
        user2_id: 2,
        group_id: 1,
      });
    })
    .then(() => {
      return knex('events').insert({
        title: 'Pokemongodb party',
        description: 'Catch pokemon and do some coding',
        created_by: 1,
        location: '701 Brazos Street, Austin, TX',
        time: '2016-08-30T08:00:00.000',
        privacy: false
      });
    })
    .then(() => {
      return knex('guests').insert({
        user_id: 1,
        event_id: 1,
        status: 'accepted'
      });
    })
    .then(() => {
      return knex('messages').insert({
        user_id: 1,
        event_id: 1,
        text: 'Zubats everywhere'
      });
    });
};
