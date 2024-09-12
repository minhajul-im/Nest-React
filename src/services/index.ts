import { locales } from "@/lib/locales";
import { getTranslations } from "next-intl/server";

export const getNavData = async () => {
  const t = await getTranslations({
    locales,
    namespace: "NavBar",
  });

  const items = ["home", "product", "blog", "about", "contact"] as const;
  const links = items.map((item: string) => ({
    title: t(`${item}.title`),
    link: t(`${item}.link`),
  }));

  return links;
};
