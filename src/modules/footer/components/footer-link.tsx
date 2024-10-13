"use client";

import Link from "next/link";
import { Item, LinkProps } from "../type";
import { usePathname } from "next/navigation";

export const FooterLink = ({ children, links, isLink = true }: LinkProps) => {
  const path = usePathname();

  return (
    <div>
      <h4 className="text-lg font-medium text-foreground text-center">
        {children}
      </h4>

      <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
        {links.map((item: Item) => (
          <li
            key={item.title}
            className="block mx-auto text-center tracking-wide font-medium">
            {isLink ? (
              <Link
                href={item.link}
                className={`hover:text-primary ${
                  path === item.link ? "text-primary" : ""
                }`}>
                {item.title}
              </Link>
            ) : (
              <span>{item.title}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
