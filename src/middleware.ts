import { type Locale, locales } from "./lib/locales";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, type NextResponse } from "next/server";

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en" satisfies Locale,
  localePrefix: "never",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req: NextRequest): NextResponse {
  return nextIntlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
