import { locales } from "@/lib/locales";
import { getTranslations } from "next-intl/server";

const HomePage = async () => {
  const t = await getTranslations({
    locales,
    namespace: "HomePage",
  });

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
      <p className="text-wrap text-base tracking-wide">{t("des")}</p>
    </div>
  );
};

export default HomePage;
