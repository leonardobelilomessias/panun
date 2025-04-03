import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    template: '%s | Panun',
    default: 'Panun  | Soluçoes imobiliariarias',
  },
  description: "Comunidade Imigrantes",
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR"  style={{paddingTop:0,marginTop:0, boxSizing: 'border-box'}}>

      <body className={inter.className}>
        <Navbar/>
        <main>{children}</main>
        {/* <Footer/> */}
      <Toaster />
        </body>
    </html>
  );
}