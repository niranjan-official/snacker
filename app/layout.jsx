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
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["snacker", "vending", "providence", "pwa"],
  authors: [
    {
      name: "Niranjan Sabarinath",
      url: "https://niranjan-official.github.io/My-Personal-Portfolio",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/snacker.jpg" },
    { rel: "icon", url: "/snacker.jpg" },
  ],
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
          termsPageUrl: '/terms'
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
        </body>
      </html>
    </ClerkProvider>
  );
}
