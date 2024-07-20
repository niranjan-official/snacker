import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({ subsets: ["latin"], weight: '400' });

export const metadata = {
    title: "Snacker",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={poppins.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
