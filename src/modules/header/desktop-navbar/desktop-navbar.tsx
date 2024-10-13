"use client";

import Link from "next/link";
import { Item } from "../type";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../components/theme-switcher";
import { buttonVariants } from "@/common/components/ui/button";
import { LanguageSwitcher } from "../components/language-switcher";

export const DesktopNavbar = ({ links }: { links: Item[] }) => {
  const path = usePathname();

  return (
    <ul className="flex items-center gap-6 text-sm">
      {links.map((item: Item) => (
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
        <ThemeSwitcher />
      </li>
    </ul>
  );
};
