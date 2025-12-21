import { useEffect, useState } from "react";

export const ImmutablePage = () => {
  const [todos, setTodos] = useState<
    Array<{ id: string; title: string; completed: boolean }>
  >([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/todos/test/immutable"
      );
      const data = await response.json();
      setTodos(data);
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4 text-center">Todos</h1>
      <div className="flex w-full max-w-md mx-auto flex-col gap-6">
        {JSON.stringify(todos)}
      </div>
    </div>
  );
};
