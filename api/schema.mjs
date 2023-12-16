
const typeDefs = `#graphql

type Todo {
  id : ID!
  text : String!
  status : Boolean!
}

type Query {
  todos:[Todo]
  todo(id : String!) : Todo
}

type Mutation{
  addTodo(text : String!) : Todo!
  deleteTodo(id : ID!) : Todo
  editTodo(id : ID! ,text : String) : Todo
  changeStatus(id : ID!) : Todo
}

`;

export default typeDefs
