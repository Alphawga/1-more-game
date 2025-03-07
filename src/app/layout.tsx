import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import { TRPCProvider } from '@/providers/trpc-provider';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1More Game - African Gaming Store",
  description: "The #1 gaming store for Africans. Buy game vouchers, in-game currencies, and more with local payment methods.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-digital-black relative`}>
        <ThemeProvider>
          <TRPCProvider>
            <div className="flex-grow relative">
              {children}
            </div>
            <div className="relative z-50">
              <Footer />
            </div>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
