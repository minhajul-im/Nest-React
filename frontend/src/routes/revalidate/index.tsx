import { RevalidatePage } from "@/pages/revalid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/revalidate/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RevalidatePage />;
}
