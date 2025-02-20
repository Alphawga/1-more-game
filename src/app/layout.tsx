import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import { TRPCProvider } from '@/utils/trpc-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1More Game - Your Gaming Marketplace in Africa",
  description: "Buy game vouchers, in-game currencies, and add-ons instantly with local payment methods.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-digital-black relative`}>
        <TRPCProvider>
          <div className="flex-grow relative">
            {children}
          </div>
        </TRPCProvider>
        <div className="relative z-50">
          <Footer />
        </div>
      </body>
    </html>
  );
}
