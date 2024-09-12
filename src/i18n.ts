"server-only";

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { type AbstractIntlMessages } from "next-intl";
import { locales, type Locale } from "./lib/locales";

const messageImports = {
  en: () => import("./messages/en.json"),
  bn: () => import("./messages/bn.json"),
} as const satisfies Record<
  Locale,
  () => Promise<{ default: AbstractIntlMessages }>
>;

export const isValidLocale = (locale: unknown): locale is Locale => {
  return locales.some((l: Locale) => l === locale);
};

export default getRequestConfig(async (params) => {
  const baseLocale = new Intl.Locale(params.locale).baseName;
  if (!isValidLocale(baseLocale)) notFound();

  return {
    messages: (await messageImports[baseLocale]()).default,
  };
});

// import { getRequestConfig } from "next-intl/server";
// import { notFound } from "next/navigation";
// import { Locale, locales } from "./lib/locales";

// export default getRequestConfig(async ({ locale }) => {
//   if (!locales.includes(locale as any)) notFound();

//   return {
//     messages: (await import(`./messages/${locale}.json`)).default,
//   };
// });
