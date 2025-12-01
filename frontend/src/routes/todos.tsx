import { TodosPage } from "@/pages/todos";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todos")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TodosPage />;
}
