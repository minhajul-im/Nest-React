"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { LanguageSwitcher } from "./language-switcher";

type LINKS_TYPE = {
  title: string;
  link: string;
};

export const Navbar = ({ links }: { links: LINKS_TYPE[] }) => {
  const path = usePathname();

  return (
    <ul className="flex items-center gap-6 text-sm">
      {links.map((item: LINKS_TYPE) => (
        <li key={item?.title}>
          <Link
            href={item.link}
            className={cn(
              buttonVariants({ variant: "link" }),
              path === item.link ? "text-primary" : "text-foreground"
            )}>
            {item.title}
          </Link>
        </li>
      ))}
      <li>
        <LanguageSwitcher />
      </li>
      <li>
        <ModeToggle />
      </li>
    </ul>
  );
};
