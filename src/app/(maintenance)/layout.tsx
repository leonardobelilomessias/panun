import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    template: '%s | Panum - Soluçoes imobiliárias',
    default: 'Panun | Soluçoes imobiliárias ',
  },
  description: "Comunidade Imigrantes",
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
