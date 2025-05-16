import { Navbar } from "@/components/Navbar"

import "../../globals.css";
import { NavbarDashboard } from "../../Screens/DashboarScreen/NavbarDashboard/NavbarDashboard";
import { Footer } from "@/components/Footer";
import { AsideDashBoard } from "../../components/modules/AsideDashboard";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { inter } from "../../config/fonts";


export const metadata: Metadata = {
  title: {
    template: '%s | Panun',
    default: 'Panun',
  },
  description: "Comunidade Brazileiro no exterior",
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br" style={{ paddingTop: 0, marginTop: 0, boxSizing: 'border-box' }}>
      <body className={`${inter.className} antialiased`}>
        
        <main>
          <div>
              <NavbarDashboard />
              <AsideDashBoard />
              <section className="relative md:left-[15%] md:w-[85%]" >
                {children}
                <Toaster />
                <div className="mt-40">

                  <Footer />
                </div>
              </section>
          
          </div>
        </main>
      </body>
    </html>
  )
}
