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
        image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSIygPKYqtRBNCjBy9vWjpuWITAKNxStGPFGJf4fJV3YfsohfkMCg',
        facebook_id: '12104755554605551',
      });
    })
    .then(() => {
      return knex('users').insert({
        name: 'Bob',
        email: 'bob@gmail.com',
        image: 'https://news.artnet.com/app/news-upload/2015/10/bobross-e1446214347195.jpg',
        facebook_id: '12104755554605552',
      });
    })
    .then(() =>{
      return knex('users').insert({
        name: 'Kenny',
        email: 'Kenny@kenny.com',
        image: 'http://rkfdnews.com/wp-content/uploads/2013/03/shark-man-costume-6491.jpg',
        facebook_id: '10104745559602550'
      })
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
      return knex('events').insert([{
        title: 'Pokemongodb Party',
        description: 'Catch pokemon and do some coding',
        category: 'entertainment',
        created_by: 1,
        location: '701 Brazos St, Austin, TX 78701',
        latitude: 30.2688755, 
        longitude: -97.7405641,
        time: '2016-08-30T08:00:00.000',
        duration: 10800,
        privacy: false
      }, {
        title: 'Pick-up Basketball Game',
        description: 'A friendly game of basketball',
        category: 'athletics',
        created_by: 2,
        location: '2100 Alamo St, Austin, TX 78722',
        latitude: 30.2770933, 
        longitude: -97.7185537,
        time: '2016-08-30T10:00:00.000',
        max_guests: 10,
        duration: 3600,
        privacy: false
      }, {
        title: 'Olympics Viewing Party',
        description: 'Swimming 4x100 medley relay',
        category: 'special',
        created_by: 1,
        location: '11601 Domain Dr, Austin, TX 78758, USA',
        latitude: 30.402735, 
        longitude: -97.7237272,
        time: '2016-08-13T20:00:00.000',
        duration: 7200,
        privacy: false
      }, {
        title: 'Chipotle Dinner',
        description: 'Come get your chiptopia points',
        category: 'dining',
        created_by: 2,
        location: '801 Congress Ave, Austin, TX 78701, USA',
        latitude: 30.2699685, 
        longitude: -97.7416397,
        time: '2016-08-12T17:30:00.000',
        max_guests: 8,
        duration: 1800,
        privacy: false
      }, {
        title: 'MKS Precourse Meetup',
        description: 'Precourse meetup at Bennu',
        category: 'coffee',
        created_by: 2,
        location: '2001 E Martin Luther King Jr Blvd, Austin, TX 78702, USA',
        latitude: 30.2797982, 
        longitude: -97.719583,
        time: '2016-08-27T09:30:00.000',
        max_guests: 10,
        duration: 7200,
        privacy: false
      }, {
        title: 'Buffalo Billiards Happy Hour',
        description: 'After work get-together',
        category: 'nightlife',
        created_by: 1,
        location: '201 E 6th St, Austin, TX 78701, USA',
        latitude: 30.267332, 
        longitude: -97.7412727,
        time: '2016-08-19T18:00:00.000',
        max_guests: 20,
        duration: 7200,
        privacy: false
      }]);
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
