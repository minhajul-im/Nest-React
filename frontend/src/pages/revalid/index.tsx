import { useEffect, useState } from "react";

export const RevalidatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<
    Array<{ id: string; title: string; completed: boolean }>
  >([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/v1/todos/test/must",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Fetch response:", response);
      const res = await response.json();
      setData(res);
      setIsLoading(false);
    };
    getData();
  }, []);

  console.log("Rendering RevalidatePage with data:", data, isLoading);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4 text-center">Todos</h1>
      <div className="flex w-full max-w-md mx-auto flex-col gap-6">
        {isLoading ? <div>Loading...</div> : JSON.stringify(data)}
      </div>
    </div>
  );
};
