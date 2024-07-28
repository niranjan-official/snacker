import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Snacker",
  description: "Don't be hungry anymore",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsVariant: "iconButton",
          termsPageUrl: 'snacker.in.net/privacy'
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
