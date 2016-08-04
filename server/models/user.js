var knex = require('../db/knex');

// *** queries *** //

module.exports = {
  getUserById,
  getUserByFacebookId,
  create,
  addGroup,
  addMemberships,
  getMemberList,
  getMemberships,
  getFriendsListId
};

function getUserById(id) {
  return knex('users').where('id', id);
}

function getUserByFacebookId(fId) {
  return knex('users').where('facebook_id',fId);
}

function create(user) {
  return knex('users').insert(user).returning(['id','name']);
}

function addGroup(groupName='friends') {
  return knex('groups').insert({ name: groupName }).returning('id');
}

function getMemberList(group_id) {
  return knex('memberships')
    .join('users', 'users.id', 'memberships.user_id')
    .where('group_id', group_id)
}

function addMemberships(user) {
  return knex('memberships').insert(user).returning(['id','user_id','group_id','rank'])
}

function getMemberships(user_id) {
  return knex('memberships')
    .join('groups', 'groups.id', 'memberships.group_id')
    .where('user_id', user_id)  //maybe grab everything but friends
}

function getFriendsListId(user_id) {
  return knex('memberships')
    .join('groups', 'groups.id', 'memberships.group_id')
    .where('groups.name', 'friends')
    .andWhere('memberships.user_id', user_id)
    .andWhere('memberships.rank', 'owner')
    .select('groups.id');
}
