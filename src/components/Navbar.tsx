'use client'
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Compass, Flag, Hotel, Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import ImageLogowhite from '@/public/images/Home/Logo_white.svg'
import ImageLogoGreen from '@/public/images/Home/logo-simple-green.svg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image";
interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/venda",
    label: "Venda",
  },
  {
    href: "/aluguel",
    label: "Aluguel",
  },
  {
    href: "/sobre",
    label: "Sobre nós",
  },
  {
    href: "/contato",
    label: "Contato",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky  bg-primaryPalet top-0 z-40 w-full dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex text-white"
            >
              <Image src={ImageLogowhite} width={150} height={100} alt="logo panum imobiliaria" />
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            {/* <ModeToggle /> */}

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex text-white md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  {/* <span className="sr-only">Menu Icon</span> */}
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  

                    <a
                      rel="noreferrer noopener"
                      href="/"
                      className=" font-bold  text-xl flex text-white relative"
                    >
                      <Image src={ImageLogoGreen} width={150} height={100} className="m-auto " alt="logo panum imobiliaria" />
                      
                    </a>

                
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  <a
                    rel="noreferrer noopener"
                    href="/entrar"

                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >

                    Entrar
                  </a>
                </nav>

              </SheetContent>
            </Sheet>
          </span>

          <nav className="  text-white gap-6 text-sm  justify-center items-center  hidden md:flex">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="hover:underline "
                    >
                      {label}
                    </Link>
                  ))}
    
                </nav>


          <div className="hidden md:flex gap-2">

            <Link
              rel="noreferrer noopener"
              href="/entrar"


              className={`border ${buttonVariants({ variant: "secondary" })} text-blue flex gap-1`}
            >
              <FaWhatsapp size={20} className="text-primaryPalet" />
              <p className="text-primaryPalet">Whatsapp</p>
            </Link>


            <PopoverDemo/>

            {/* <ModeToggle /> */}
          </div>

        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};




export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-white border border-white bg-transparent">Login</Button>
      </PopoverTrigger>
      <PopoverContent className=" flex flex-col gap-1">
      <Link rel="noreferrer noopener" href="/entrar" className=' text-primaryPalet flex  items-center text-sm hover:bg-primaryPalet hover:text-white rounded-md flex-1 p-2 '>
              <p className="">Login como Parceiro</p>
      </Link>
      <Link rel="noreferrer noopener" href="/entrar" className=' text-primaryPalet flex  items-center text-sm hover:bg-primaryPalet hover:text-white rounded-md flex-1 p-2 '>
              <p className="">Login como Cliente</p>
      </Link>
      </PopoverContent>
    </Popover>
  )
}
