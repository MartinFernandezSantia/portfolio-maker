import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { PortfolioProvider } from "@/contexts/PortfolioContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Maker",
  description: "Website to generate portfolios for lazy devs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider defaultTheme="system" enableSystem attribute="class">
          <TooltipProvider>
            <Toaster />
            <PortfolioProvider> 
              {children}
            </PortfolioProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
