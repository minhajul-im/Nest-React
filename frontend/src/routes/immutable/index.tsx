import { ImmutablePage } from "@/pages/imutable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/immutable/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ImmutablePage />;
}
