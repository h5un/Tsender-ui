import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers"; // Import the Providers component
import Header from "@/components/Header"; // Import the Header component`

export const metadata: Metadata = {
  title: "Tsender",
  description: "A simple ERC20 token sender dApp"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the entire body content with Providers */}
        <Providers>
          <Header /> 
          {children} {/* This will include every page */}
        </Providers>
      </body>
    </html>
  );
}
