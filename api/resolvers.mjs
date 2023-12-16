import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { nanoid } from "nanoid";
import { join, dirname } from "node:path";
const __dirname = dirname(process.argv[1]);
const file = join(__dirname, "./db/db.json");
const adapter = new JSONFile(file, {});
const defaultData = { todos: [] };

const db = new Low(adapter, defaultData);

const resolvers = {
  Query: {
    todos: async () => {
      await db.read();
      const { todos } = db.data;
      return todos;
    },
    todo: async (parent, args) => {
      await db.read();
      const { todos } = db.data;
      const singleTodo = todos.find((todo) => todo.id === args.id);
      if (!singleTodo) {
        return null;
      }
      return singleTodo;
    },
  },
  Mutation: {
    addTodo: async (parent, args) => {
      const uniqueID = nanoid(8);
      await db.read();
      const { todos } = db.data;
      const newTodo = {
        text: args.text,
        id: uniqueID,
        status : false
      };
      todos.push(newTodo);
      db.write();
      return newTodo;
    },
    deleteTodo: async (parent, args) => {
      await db.read();
      let { todos } = db.data;
      const deletedValue = todos.find((todo) => todo.id === args.id);
      if (!deletedValue) {
        return null;
      }
      const filtered = todos.filter((todo) => todo.id !== args.id);
      todos = filtered;
      db.data = { todos };
      await db.write();
      return deletedValue;
    },
    editTodo: async (parent, args) => {
      await db.read();
      const { todos } = db.data;
      const editIndex = todos.findIndex((todo) => todo.id == args.id);
      if (editIndex < 0) {
        return null;
      }
      const editedTodo = {
        ...todos[editIndex],
        text: args.text,
      };
      todos[editIndex] = editedTodo;
      await db.write();
      return editedTodo;
    },
    changeStatus : async (parent, args) => {
      await db.read();
      const { todos } = db.data;
      const todoStatusIndex = todos.findIndex((todo) => todo.id === args.id);
      if (todoStatusIndex < 0) {
        return null;
      }
      const changeTodoStatus = {...todos[todoStatusIndex],status: !todos[todoStatusIndex].status}
      todos[todoStatusIndex] = changeTodoStatus
      await db.write();
      return changeTodoStatus;
    }
  },
};

export default resolvers;
