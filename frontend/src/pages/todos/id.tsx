import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useEffect, useState } from "react";

export const SingleTodoPage = () => {
  const [todo, setTodo] = useState<
    | {
        id: string;
        title: string;
        completed: boolean;
        description?: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3000/todos/1");
      const data = await response.json();
      setTodo(data);
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4 text-center">Todo</h1>
      <div className="flex w-full max-w-md mx-auto flex-col gap-6">
        <Item variant="outline" key={todo?.id}>
          <ItemContent>
            <ItemTitle className="capitalize">
              {todo?.title?.slice(0, 20)}
            </ItemTitle>
            <ItemDescription>{todo?.title}</ItemDescription>
            {todo?.description && (
              <>
                <hr />
                <ItemDescription>{todo?.description}</ItemDescription>
              </>
            )}
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>
      </div>
    </div>
  );
};
