import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Snacker",
  description: "Vend your snack in no time",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsVariant: "iconButton",
          termsPageUrl: '/terms'
        },
      }}
    >
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body className={poppins.className}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
