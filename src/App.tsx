import { useState } from "react";
import useCheckTodo from "./hooks/use-check-todo";
import useGetTodos from "./hooks/use-get-todos";
import useGetUser from "./hooks/use-get-user";
import useLogin from "./hooks/use-login";
import useLogout from "./hooks/use-logout";
import useAddTodo from "./hooks/use-add-todo";

function App() {
  const { data: todos, refetch: refreshTodos } = useGetTodos();
  const { mutateAsync: checkTodo } = useCheckTodo();
  const { mutateAsync: login } = useLogin();
  const { data: user, refetch: refreshUser } = useGetUser();
  const { mutateAsync: logout } = useLogout();
  const { mutateAsync: addTodo } = useAddTodo();
  const [todo, setTodo] = useState<string>();

  async function onCheckTodo(id: string) {
    await checkTodo(id);
    refreshTodos();
  }

  async function onLogout() {
    await logout();
    refreshUser();
  }

  async function onLogin() {
    await login("yavuzworkshop@gmail.com");
    alert("EPosta gönderildi");
  }

  async function onAddTodo() {
    await addTodo(todo!);
    setTodo("");
    refreshTodos();
  }

  return (
    <div className="container mx-auto mt-10">
      {!user?.user ? (
        <button className="my-10" onClick={onLogin}>
          Login
        </button>
      ) : (
        <>
          <button className="my-10" onClick={() => onLogout()}>
            {user.user?.email} <span className="text-red-500">Logout</span>
          </button>
        </>
      )}

      <h2 className="mb-2 text-lg font-semibold text-gray-900">TODOS</h2>

      <div className="py-5">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 mr-5"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={() => onAddTodo()}>Add Todo</button>
      </div>

      <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside">
        {todos?.map((w) => (
          <li>
            <span
              className={`font-semibold ${
                w.is_completed ? " text-green-500" : " text-gray-900"
              } pr-5`}
            >
              {w.name}
            </span>
            {!w.is_completed && (
              <button
                className="text-green-500"
                onClick={() => onCheckTodo(w.id)}
              >
                Done
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
