module.exports = {
  Query: {
    todos(parent, args, { models}, info) {
      return models.Todo.itemAll();
    },
    todo(parent, args, { models }, info) {
      return models.Todo.oneItem(args.id)
    }
  },
  Mutation : {
    addTodo(parent, args, { models }, info){
      return models.Todo.add(args.text)
    },
    deleteTodo(parent, args, { models,db }, info){
      const allObj = models.Todo.delete(args.id)
      const filter = allObj.filtredObj
      const deleted = allObj.deletedObj
      db.set("todo", [...filter]).write()
      return deleted
    },
    editTodo(parent, args, { models }, info){
      return models.Todo.edit(args.id,args.text)
    }

  }

}
