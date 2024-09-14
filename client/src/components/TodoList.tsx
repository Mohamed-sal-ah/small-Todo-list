import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../schemas/Todo";
import { nanoid } from "nanoid";

function TodoList() {
  const [editMode, setEditMode] = useState<boolean>(false);

  const [editTodoItem, setEditTodoItem] = useState<null | Todo>(null);

  const [text, setText] = useState<string>("");

  const [editInput, setEditInput] = useState<string>("");

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = () => {
    const allTodoList = todoList
    const uniqueID = nanoid(8);
    const newTodo : Todo = {
        text : text,
        id : uniqueID,
        status : false
     }
    allTodoList.push(newTodo)
    console.log(newTodo);
    setTodoList(allTodoList)
    localStorage.setItem('todo_list',JSON.stringify(allTodoList))
    setText('')
  }

  const editTodo = () => {
    if (editTodoItem !== null) {
      console.log(editTodoItem);
        
      const allTodoList = todoList
      const editIndex : number = todoList.findIndex(todos => todos.id == editTodoItem.id)  
        const editedTodo = {
          ...allTodoList[editIndex],
          text: editInput
        };
        allTodoList[editIndex] = editedTodo;
        localStorage.setItem('todo_list',JSON.stringify(allTodoList))
        setTodoList(allTodoList)
        cancelEditMode();
    }
  }

  const deleteTodo = (deletId :string) => {
    const filteredTodos = todoList.filter((todo) => todo.id !== deletId);
    localStorage.setItem('todo_list',JSON.stringify(filteredTodos))
    setTodoList(filteredTodos)
  }

  const changeStatus = (statusId : string) => {
    const allTodoList = todoList
    const todoStatusIndex = allTodoList.findIndex((todo) => todo.id === statusId)  
    const changeTodoStatus = {...allTodoList[todoStatusIndex],status: !allTodoList[todoStatusIndex].status}
    allTodoList[todoStatusIndex] = changeTodoStatus
    localStorage.setItem('todo_list',JSON.stringify(allTodoList))
    setTodoList(allTodoList)
  }

  const setToEditMode = (todo: Todo) => {
    setEditTodoItem(todo);
    setEditMode(true);
    setEditInput(todo.text);
    setText("");
  };
  
  const cancelEditMode = () => {
    setEditTodoItem(null);
    setEditMode(false);
    setEditInput("");
  };

  useEffect(() => {
    const todoLocalStorage : null | string = localStorage.getItem('todo_list')
    if (todoLocalStorage !== null) {
      setTodoList(JSON.parse(todoLocalStorage))
    }
  },[])
  

  return (
    <div className="w-full">
      {editTodoItem && editMode ? (
        <div
          className="flex flex-col gap-3 py-2"
        >
          <div>
            <span className="mb-1 block text-sm font-medium text-gray-800 dark:text-slate-200">
              Edit Todo
            </span>
            <input
              type="text"
              className="dark:input-auto ring-gray w-full rounded border-0 bg-gray-100/70 px-2 py-1 text-gray-800 shadow-sm outline-none ring-1 ring-inset focus:ring-2 focus:ring-violet-500 dark:bg-slate-700/70 dark:text-white dark:ring-slate-400/70"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
            />
          </div>
          <div className="flex grow flex-row">
            <button
              className="rounded bg-emerald-800 px-2 py-1 tracking-wide text-white enabled:hover:bg-emerald-700 disabled:opacity-70"
              disabled={editInput === ""}
              type="submit"
              onClick={() => editTodo()}
            >
              Update
            </button>
            <button
              className="ml-2 px-1 tracking-wide text-red-900 hover:opacity-70 dark:text-rose-400"
              type="button"
              onClick={() => cancelEditMode()}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-row items-end py-2"
        >
          <div className="w-full">
            <span className="mb-1 block text-sm font-medium text-gray-800 dark:text-slate-200">
              Add Todo
            </span>
            <input
              className="dark:input-auto ring-gray w-full rounded border-0 bg-gray-100/70 px-2 py-1 text-gray-800 shadow-sm outline-none ring-1 ring-inset focus:ring-2 focus:ring-violet-500 dark:bg-slate-700/70 dark:text-white dark:ring-slate-400/70"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            className="hover:opacity ml-2 h-fit rounded bg-emerald-800 px-2 py-1 tracking-wide text-white enabled:hover:bg-emerald-700 disabled:opacity-70"
            type="submit"
            disabled={text === ""}
            onClick={() => addTodo()}
          >
            Submit
          </button>
        </div>
      )}
      {todoList.length !== 0 && !editMode ? (
        <ul className="flex flex-col justify-center">
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              singleTodo={todo}
              setToEditMode={setToEditMode}
              deleteTodo={deleteTodo}
              changeStatus={changeStatus}
            />
          ))}
        </ul>
      ) : (
        <>
          {!editMode && (
            <p className="py-2 text-center font-light text-gray-500 dark:text-gray-200">
              You have nothing todo
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default TodoList;
