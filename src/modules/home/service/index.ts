import { locales } from "@/lib/locales";
import { getTranslations } from "next-intl/server";

export const getHomePageData = async () => {
  const t = await getTranslations({
    locales,
    namespace: "HomePage",
  });

  return { title: t("title"), description: t("des") };
};
