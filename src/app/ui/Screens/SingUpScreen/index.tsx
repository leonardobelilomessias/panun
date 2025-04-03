import Image from "next/image";
import { FormSignup } from "./FormSignup";
import Link from "next/link";
import HeroSingup2 from '@/app/public/images/Landing/hero-flags.png'
import { Navbar } from "@/components/Navbar";

export function SingUpScreen(){
    return(
        <>
        <Navbar/>
        <div className="flex flex-row h-full h-screen ">

            <div className=" hidden md:flex  w-screen  flex-1 justify-center items-center justify-self-center place-items-center   h-50 content-center relative">
            {/* <Image alt="real estate"  fill  style={{objectFit: "fill"}}    src={HeroSingup2}/> */}
            <Image alt="real estate"  width={500} height={500}   src={HeroSingup2}/>

            </div>
            <div className="flex gap-4 w-[70%] content-center  justify-items-center items-center flex-1 h-200 mt-20 flex-col ">
                <div className=" flex flex-col w-[75%] ">
                    <h1 className="font-bold text-3xl text-center  text-primaryPalet">Participe da maior comunidade de network de brasileiros no exterior.</h1>
                    <p className="text-center text-gray-500" >Se increva e tenha interaja com a comunidade de brasileiros que já estão ou pretendem imigrar.</p>
                </div>
                <div className="  w-[70%] ">
                    <FormSignup/>

                </div>
        <Link  className="w-[70%] mt-6  text-center border-[1px] p-2 rounded border-primaryPalet text-primaryPalet" href={'/entrar'}   >Voltar para Login</Link>
            </div>
        </div>
        </>
    )
}