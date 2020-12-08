const db = require('../../data/dbConfig');

module.exports = {
  getAll,
  getByID,
  create,
  update,
  remove
}

function getAll() {
  // SELECT * FROM accounts;
  return db('accounts')
}

function getByID(id) {
  // SELECT * FROM accounts WHERE id = ...;
  return db('accounts').where({ id }).first()
}

function create(account) {
  // INSERT INTO accounts (name, budget)
  // VALUES ('foo', 'bar');
  return db('accounts').insert(account)
    .then(([id]) => {
      return db('accounts').where({ id }).first()
    })
}

function update(id, account) {
 // UPDATE accounts SET title = 'foo', contents = 'bar'
 // WHERE id = 1;
 
 return db('accounts').where({ id }).update(account)
  .then(() => {
    return getByID(id)
  })
}

function remove(id) {
 //DELETE FROM accounts WHERE id = 1;
 return db('accounts').where({ id }).del()
}

