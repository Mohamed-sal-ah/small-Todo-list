const format = require('date-format');

const createTodoModel = db => {
  return {
    itemAll() {
      return db.get('todo').value()
    },
    oneItem(id) {
      const idNumb = parseInt(id)
      const numb = db.get('todo').size().value()
      if (idNumb > numb) {
        res.json({ todo: 'Error item does not exitst' })
      }
      const getitemAll = db.get("todo").value()
      const filtred = getitemAll.find(item => item.id === parseInt(idNumb))
      return filtred
    },
    add(text) {
      const newObj = {}
      const idNumb = db.get('todo').size().value()
      newObj['text'] = text
      newObj["id"] = idNumb
      newObj['editedDate'] = ""
      newObj["createDate"] = format('yyyy-MM-dd hh:mm:ss')
      db.get("todo").push({
        ...newObj
      }).write()
      return newObj
    },
    delete(id) {
      const idNumb = parseInt(id)
      const getAllTodo = db.get("todo").value()
      const filterTodo = getAllTodo.filter(item => item.id !== idNumb)
      const deleted = getAllTodo.find(item => item.id === idNumb)
      return {filtredObj : filterTodo, deletedObj : deleted}
    },
    edit(id, text) {
      const idNumb = parseInt(id)
      const numb = db.get('todo').size().value()
      let newObj = {}
      const getAllTodo = db.get("todo").value()
      const updatedAllTodo = getAllTodo.map(todo => {
        if (todo.id === idNumb) {
          newObj = { text: text, id: todo.id, editedDate: format('yyyy-MM-dd hh:mm:ss'), createDate: todo.createDate }
          return { text: text, id: todo.id, editedDate: format('yyyy-MM-dd hh:mm:ss'), createDate: todo.createDate }
        }
        return todo
      })
      db.set("todo", [...updatedAllTodo]).write()
      return newObj
    }

  }
}

module.exports = createTodoModel
