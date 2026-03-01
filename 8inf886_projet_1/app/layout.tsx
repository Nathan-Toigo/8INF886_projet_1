import type { Metadata } from "next";
import "./styles/globals.css";
import { Providers } from "./providers";
import CookieConsentBanner from "./components/cookieConsentBanner";

export const metadata: Metadata = {
  title: "Super Web Projet !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body>
        <Providers>
          {children}
          <CookieConsentBanner />
        </Providers>
      </body>
    </html>
  );
}
