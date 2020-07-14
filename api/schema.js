const { gql } = require('apollo-server')

const typeDefs = gql`

type Todo {
  id : Int!
  text : String!
  createDate: String!
  editedDate: String!
}

type Query {
  todos:[Todo!]
  todo(id : Int!) : Todo!
}

type Mutation{
  addTodo(text : String!) : Todo!
  deleteTodo(id : Int!) : Todo!
  editTodo(id : Int! , text :String) : Todo!
}

`;

module.exports = typeDefs
