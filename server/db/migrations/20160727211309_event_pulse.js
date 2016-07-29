exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments();
      table.string('name').notNullable();
      table.string('email');
      table.string('image');
      table.integer('facebook_id');
    }),
    knex.schema.createTable('groups', function(table){
      table.increments();
      table.string('name').notNullable();
    }),
    knex.schema.createTable('memberships', function(table){
      table.increments();
      table.integer('user1_id').notNullable().references('id').inTable('users');
      table.integer('user2_id').notNullable().references('id').inTable('users');
      table.integer('group_id').notNullable().references('id').inTable('groups');
    }),
    knex.schema.createTable('events', function(table){
      table.increments();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.integer('created_by').notNullable().references('id').inTable('users');
      table.string('location').notNullable();
      table.dateTime('time');
      table.integer('duration');
      table.integer('max_guests');
      table.boolean('privacy').notNullable();
      table.integer('group_visibility').references('id').inTable('groups');
      table.timestamps();
    }),
    knex.schema.createTable('hidden_events', function(table){
      table.increments();
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.integer('event_id').notNullable().references('id').inTable('events');
    }),
    knex.schema.createTable('guests', function(table){
      table.increments();
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.integer('event_id').notNullable().references('id').inTable('events');
      table.string('status').notNullable();
    }),
    knex.schema.createTable('messages', function(table){
      table.increments();
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.integer('event_id').notNullable().references('id').inTable('events');
      table.string('text').notNullable();
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('guests')
      .dropTable('hidden_events')
      .dropTable('messages')
      .dropTable('events')
      .dropTable('memberships')
      .dropTable('groups')
      .dropTable('users');
};
