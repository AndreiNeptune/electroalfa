import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electroalfa | Electrical Equipment Manufacturer",
  description: "Modern Industrial Professional standard.",
};

export async function generateStaticParams() {
  return [{ lang: 'ro' }, { lang: 'en' }, { lang: 'de' }, { lang: 'fr' }, { lang: 'it' }];
}

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang}>
      <body className={`${inter.className} min-h-screen flex flex-col bg-steel`}>
        <Header lang={lang} />
        <div className="flex-grow">
          {children}
        </div>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
