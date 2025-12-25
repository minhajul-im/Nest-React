import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
}

const BASE_URL = `http://localhost:3000/api/v1/todos`;

export const TodosPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const getData = async () => {
    setIsLoading(true);

    const lastETag = localStorage.getItem("todosETag");

    const response = await fetch(BASE_URL, {
      headers: lastETag ? { "If-None-Match": lastETag } : {},
    });

    const etag = response.headers.get("ETag");

    if (response.status === 304) {
      const cachedData = localStorage.getItem("todosData");
      if (cachedData) {
        setTodos(JSON.parse(cachedData));
      }
      setIsLoading(false);
      return;
    }

    if (!response.ok) {
      console.error("Fetch error:", response.status);
      setIsLoading(false);
      return;
    }

    const data = await response.json();

    localStorage.setItem("todosData", JSON.stringify(data));

    if (etag) {
      localStorage.setItem("todosETag", etag);
    }

    setIsLoading(false);
    setTodos(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const response = await fetch(
      `${BASE_URL}${todo?._id ? `/${todo._id}` : ""}`,
      {
        method: todo?._id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }
    );

    if (response.ok) {
      await response.json();
      getData();
      setTodo(null);
      form.reset();
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      await response.json();
      getData();
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4 text-center">Todos</h1>
      <Card className="w-full max-w-sm mx-auto mb-4">
        <CardHeader>
          <CardTitle>Add a new todo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="grid gap-0.5">
                <label htmlFor="title">Title</label>
                <Input
                  name="title"
                  type="text"
                  defaultValue={todo?.title || ""}
                  placeholder="Enter title"
                  required
                />
              </div>
              <div className="grid gap-0.5">
                <label htmlFor="description">Description</label>
                <Input
                  name="description"
                  type="text"
                  defaultValue={todo?.description || ""}
                  placeholder="Enter description"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="flex w-full max-w-sm mx-auto flex-col gap-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          todos &&
          todos.length > 0 &&
          todos?.map((t) => (
            <Item variant="outline" key={t._id}>
              <ItemContent>
                <ItemTitle className="capitalize">{t?.title}</ItemTitle>
                <ItemDescription>
                  {t?.description?.slice(0, 50)}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button onClick={() => setTodo(t)} variant="outline" size="sm">
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(t._id)}
                  className="text-red-500 border border-red-500">
                  Delete
                </Button>
              </ItemActions>
            </Item>
          ))
        )}
      </div>
    </div>
  );
};
