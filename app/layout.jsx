import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  applicationName: 'snacker',
  title: "Snacker",
  description: "Don't be hungry anymore",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#191919",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsVariant: "iconButton",
          termsPageUrl: '/privacy'
        },
      }}
    >
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body className={poppins.className}>
          <main>{children}</main>
          <Toaster />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
