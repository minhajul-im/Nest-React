import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useEffect, useState } from "react";

export const TodosPage = () => {
  const [todos, setTodos] = useState<
    Array<{ id: string; title: string; completed: boolean }>
  >([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      setTodos(data);
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4 text-center">Todos</h1>
      <div className="flex w-full max-w-md mx-auto flex-col gap-6">
        {todos?.map((todo) => (
          <Item variant="outline" key={todo.id}>
            <ItemContent>
              <ItemTitle className="capitalize">
                {todo?.title?.slice(0, 20)}
              </ItemTitle>
              <ItemDescription>{todo?.title}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <a href={`/todo-id`}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </a>
            </ItemActions>
          </Item>
        ))}
      </div>
    </div>
  );
};
