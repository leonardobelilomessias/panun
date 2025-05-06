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


import { Compass, Flag, Hotel, Menu } from "lucide-react";


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
    <header className="sticky  bg-primary-palet top-0 z-40 w-full dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className=" h-14 px-20 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex text-white"
            >
              <Image src={ImageLogowhite} width={150} height={100} alt="logo panum imobiliaria" />
            </a>
          </NavigationMenuItem>


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
      <Link rel="noreferrer noopener" href="/entrar" className=' text-primary-palet flex  items-center text-sm hover:bg-primary-palet hover:text-white rounded-md flex-1 p-2 '>
              <p className="">Login como Parceiro</p>
      </Link>
      <Link rel="noreferrer noopener" href="/entrar" className=' text-primary-palet flex  items-center text-sm hover:bg-primary-palet hover:text-white rounded-md flex-1 p-2 '>
              <p className="">Login como Cliente</p>
      </Link>
      </PopoverContent>
    </Popover>
  )
}
