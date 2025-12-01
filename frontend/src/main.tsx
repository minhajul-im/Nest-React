import "./styles/global.css";
import { routeTree } from "./routeTree.gen";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./lib/apollo-client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={apolloClient}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
