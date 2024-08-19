import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import Script from "next/script";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Snacker",
  description: "Vend your snack in no time",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Snacker",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsVariant: "iconButton",
          termsPageUrl: "/terms",
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
          <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
