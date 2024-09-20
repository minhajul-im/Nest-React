"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type LINK = {
  title: string;
  link: string;
};

type Props = {
  isLink?: boolean;
  children: string;
  links: LINK[];
};

const FooterLinks = ({ children, links, isLink = true }: Props) => {
  const path = usePathname();

  return (
    <div>
      <h4 className="text-lg font-medium text-foreground text-center">
        {children}
      </h4>

      <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
        {links.map((item: LINK) => (
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

export default FooterLinks;
