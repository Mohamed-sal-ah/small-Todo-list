import { useState } from "react";
import { Todo } from "../schemas/Todo";

interface Props {
  singleTodo: Todo;
  setToEditMode: (todo: Todo) => void;
  changeStatus : (id : string) => void;
  deleteTodo : (id : string) => void;
}

function TodoItem({ singleTodo, setToEditMode,changeStatus,deleteTodo }: Props) {

  const [status,setStatus] = useState<boolean>(singleTodo.status)

  const singleChangeStatus = () => {
    setStatus(!status)
    changeStatus(singleTodo.id)
  }
  
  return (
    <li className="flex grow flex-row items-center justify-between border-b px-1 py-2 dark:border-slate-600">
      <div className="relative mr-2 flex h-6 w-6 items-center">
        <input
          type="checkbox"
          defaultChecked={status}
          onChange={() => {singleChangeStatus()}}
          id={singleTodo.id}
          className="peer relative h-6 w-6 shrink-0 cursor-pointer appearance-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke=""
          className={
            (status
              ? "peer-hover:bg-blue-700"
              : "peer-hover:bg-gray-300 peer-hover:dark:bg-gray-600") +
            " pointer-events-none absolute h-6 w-6 rounded-md bg-gray-200 fill-none peer-checked:bg-blue-600 peer-checked:stroke-white  dark:bg-gray-700"
          }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
      <p
        className={
          (status ? "line-through opacity-40 " : "") +
          "grow text-base dark:text-white"
        }
      >
        {singleTodo.text}
      </p>
      <button
        className="p-1 hover:opacity-70"
        onClick={() => setToEditMode(singleTodo)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6 dark:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      <button
        className="p-1 text-white hover:opacity-70"
        onClick={() => deleteTodo(singleTodo.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6 stroke-red-700 dark:stroke-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </li>
  );
}

export default TodoItem;
