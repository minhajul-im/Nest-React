import { locales } from "@/lib/locales";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, MessageCircleMore, PhoneCall } from "lucide-react";

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
