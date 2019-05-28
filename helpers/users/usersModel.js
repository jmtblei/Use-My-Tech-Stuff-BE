const db = require('../../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
  get,
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
    .first();
}

function get() {
  return db('users')
  .orderBy('id')
}