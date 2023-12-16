import TodoList from "./components/TodoList";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-300 dark:bg-slate-950">
      <section className="mt-4 flex w-[90%] max-w-[500px] flex-col items-center justify-center rounded-md bg-white p-4 shadow-lg dark:bg-slate-800/90">
        <header>
          <h1 className="font-san w-100 p-2 text-center text-3xl font-bold uppercase dark:text-white">
            Small Todo List
          </h1>
        </header>
        <TodoList />
      </section>
    </main>
  );
}
export default App;
