import { locales } from "@/lib/locales";
import { getTranslations } from "next-intl/server";
import { LINKS_TYPE } from "@/components/header/navbar";
import { Mail, MapPin, MessageCircleMore, PhoneCall } from "lucide-react";

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

export const getContactData = async () => {
  const t = await getTranslations({
    locales,
    namespace: "Contact",
  });

  const items = ["office", "email", "whatsapp", "telephone"] as const;
  const icons = [MapPin, Mail, MessageCircleMore, PhoneCall];

  const contactCard = items.map((item: string, idx: number) => ({
    title: t(`${item}.title`),
    details: t(`${item}.details`),
    Icon: icons[idx],
  }));

  return contactCard;
};

export const getFooterData = async () => {
  const t = await getTranslations({
    locales,
    namespace: "Footer",
  });
  const nav = await getNavData();

  const company = t("company");
  const setting = t("setting");
  const contact = t("contact");
  const sItems = ["faq", "terms", "policy"] as const;
  const cItems = ["/about", "/blog", "/products"] as const;

  const contactData = [
    {
      title: t("phone"),
      link: "",
    },
    {
      title: t("email"),
      link: "",
    },
    {
      title: t("location"),
      link: "",
    },
  ];

  const companyData = nav.filter((item: LINKS_TYPE) =>
    cItems.includes(item.link as "/products" | "/blog" | "/about")
  );

  const settingsData = sItems.map((item: string) => ({
    title: t(`${item}.title`),
    link: t(`${item}.link`),
  }));

  return { company, setting, contact, settingsData, companyData, contactData };
};
