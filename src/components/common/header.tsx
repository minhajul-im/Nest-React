import Link from "next/link";
import { Navbar } from "./navbar";
import { getNavData } from "@/services";

export const Header = async () => {
  const links = await getNavData();

  return (
    <header className="border-b">
      <header className="container mx-auto px-4 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 justify-start md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600 dark:text-teal-300" href="/">
              <span className="sr-only">Home</span>
              <svg
                className="h-8"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                // height="200px"
                // width="200px"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M256 23c-35 0-62 17.92-79.3 41.71-11.9 16.38-19.6 35.49-23.2 54.29H172c3.4-15.2 9.9-30.77 19.3-43.71C206 55.08 227 41 256 41s50 14.08 64.7 34.29c9.4 12.94 15.9 28.51 19.3 43.71h18.5c-3.6-18.8-11.3-37.91-23.2-54.29C318 40.92 291 23 256 23zM88.25 137L57.81 487H454.2l-30.4-350H88.25zM160 160a16 16 0 0 1 16 16 16 16 0 0 1-16 16 16 16 0 0 1-16-16 16 16 0 0 1 16-16zm192 0a16 16 0 0 1 16 16 16 16 0 0 1-16 16 16 16 0 0 1-16-16 16 16 0 0 1 16-16z"></path>
              </svg>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <Navbar links={links} />
            </nav>
          </div>
        </div>
      </header>
    </header>
  );
};
