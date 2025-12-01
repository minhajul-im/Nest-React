import { SingleTodoPage } from "@/pages/todos/id";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todo-id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SingleTodoPage />;
}
