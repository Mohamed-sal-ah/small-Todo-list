import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { ADD_TODO, EDIT_TODO, TODO_QUERY } from "../schemas/queries";
import { Todo } from "../schemas/Todo";

function TodoList() {
  const [editMode, setEditMode] = useState<boolean>(false);

  const [editTodoItem, setEditTodoItem] = useState<null | Todo>();

  const [text, setText] = useState<string>("");

  const [editInput, setEditInput] = useState<string>("");

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const { error: todosError, data: todosData } = useQuery(TODO_QUERY);

  const [addTodo, { loading: addTodoLoading, error: addTodoError }] =
    useMutation(ADD_TODO, {
      refetchQueries: [{ query: TODO_QUERY }],
    });

  const [editTodo, { loading: editLoading, error: editError }] = useMutation(
    EDIT_TODO,
    {
      refetchQueries: [{ query: TODO_QUERY }],
    },
  );

  useEffect(() => {
    if (todosError) {
      console.error("Todos ERROR MESSAGE: ", todosError.message);
      console.error(todosError);
    }
    if (addTodoError) {
      console.error("addTodo ERROR MESSAGE: ", addTodoError.message);
      console.error(addTodoError);
    }
    if (editError) {
      console.error("editTodo ERROR MESSAGE: ", editError.message);
      console.error(editError);
    }
  }, [todosError, editError, addTodoError]);

  useEffect(() => {
    if (todosData) {
      setTodoList(todosData.todos);
    }
  }, [todosData]);

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

  return (
    <div className="w-full">
      {editTodoItem && editMode ? (
        <form
          className="flex flex-col gap-3 py-2"
          onSubmit={(e) => {
            e.preventDefault();
            editTodo({
              variables: { id: editTodoItem.id, text: editInput },
            });
            cancelEditMode();
          }}
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
              disabled={editLoading || editInput === ""}
              type="submit"
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
        </form>
      ) : (
        <form
          className="flex flex-row items-end py-2"
          onSubmit={(e) => {
            e.preventDefault();
            addTodo({ variables: { text: text } });
            setText("");
          }}
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
            disabled={addTodoLoading || text === ""}
          >
            Submit
          </button>
        </form>
      )}

      {todoList.length !== 0 && !editMode ? (
        <ul className="flex flex-col justify-center">
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              singleTodo={todo}
              setToEditMode={setToEditMode}
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
