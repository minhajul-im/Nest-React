import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 justify-center items-center">
        {/* <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/signin" className="[&.active]:font-bold">
          Sign In
        </Link>
        <Link to="/signup" className="[&.active]:font-bold">
          Sign Up
        </Link> */}
        <Link to="/users" className="[&.active]:font-bold">
          Users
        </Link>
        <Link to="/blogs" className="[&.active]:font-bold">
          Blogs
        </Link>

        <Link to="/todos" className="[&.active]:font-bold">
          Todos
        </Link>
        {/* <Link to="/revalidate" className="[&.active]:font-bold">
          Revalidate
        </Link>
        <Link to="/immutable" className="[&.active]:font-bold">
          Immutable
        </Link>
        <Link to="/e-tag" className="[&.active]:font-bold">
          E-Tag
        </Link> */}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
