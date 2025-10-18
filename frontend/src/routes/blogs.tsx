import { BlogsPage } from "@/pages/blogs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
});
