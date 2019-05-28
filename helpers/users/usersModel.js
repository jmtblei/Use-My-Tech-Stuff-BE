const db = require('../../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
  get,
  updateUser,
  removeUser,
};

function find() {
  return db('users')
    .select('id', 'username', 'password')
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user).returning("id");
  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .select('id', 'username', 'firstname', 'lastname', 'email', 'phone', 'address')
    .first();
}

function get() {
  return db('users')
  .select('id', 'username', 'firstname', 'lastname', 'email', 'phone', 'address')
  .orderBy('id')
}

function updateUser(id, changes) {
  return db('users')
  .where({ id })
  .update(changes);
}

function removeUser(id) {
  return db('users')
  .where('id', id)
  .del();
}