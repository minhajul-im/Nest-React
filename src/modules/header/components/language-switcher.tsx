"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import * as React from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/lib/locales";
import { GlobeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/common/components/ui/button";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const locale = useLocale() as Locale;

  const handleLocaleChange = (newLocale: Locale): void => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[120px]">
        <DropdownMenuLabel>Languages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={locale === "en"}
          onCheckedChange={() => handleLocaleChange("en")}>
          English
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === "bn"}
          onCheckedChange={() => handleLocaleChange("bn")}>
          Bangla
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
