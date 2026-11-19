import { notFound } from "next/navigation";
import { LanguageProvider, type Locale } from "@/components/LanguageContext";

const LOCALES: Locale[] = ["es", "en"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  return (
    <LanguageProvider locale={locale as Locale}>{children}</LanguageProvider>
  );
}