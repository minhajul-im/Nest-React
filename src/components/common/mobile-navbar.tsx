"use client";

import Link from "next/link";
import { useState } from "react";
import { LINKS_TYPE } from "./navbar";
import { Button } from "../ui/button";
import { X, Menu } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";

const MobileNavbar = ({ links }: { links: LINKS_TYPE[] }) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="md:hidden">
      <section className="relative">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div
          className={`fixed top-0 left-0 w-72 sm:w-80 z-50 h-full duration-500  transition-transform ease-in-out bg-background text-foreground ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="mb-4 px-6 pt-6 flex items-center justify-between">
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="outline">
              <X />
            </Button>
          </div>

          <ul className="px-6">
            {links.map((item: LINKS_TYPE, index: number) => (
              <Link
                href={item.link}
                key={item.title}
                className={`${
                  path === item.link ? "text-primary" : "text-foreground"
                }`}>
                <li
                  className={`py-3 text-base block transition-transform duration-500 ease-in-out font-semibold ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}>
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex items-center gap-5">
        <LanguageSwitcher />
        <ModeToggle />
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size={"icon"}
          variant="outline">
          <Menu />
        </Button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
