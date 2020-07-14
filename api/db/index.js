const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./api/db/db.json')
const db = low(adapter)
const createTodoModel = require('./todo')

module.exports = {
  models: {
    Todo: createTodoModel(db),
  },
  db
}
