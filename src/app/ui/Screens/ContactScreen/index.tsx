import { Mail, Phone, Share, Share2 } from "lucide-react"
import Image from "next/image"
import imageLogo from '@/app/public/images/Home/logo_white_full.svg'
export default function ContactScreen() {
    return (
        <div className="flex">
            <div className=" bg-primaryPalet w-1/2 h-[100vh] flex-1  justify-center hidden sm:flex">
                <div className=" mt-[30%] " >
                    <Image src={imageLogo} width={800} height={600} alt="image panun" />
                </div>
            </div>
            <div className="  flex flex-col bg-white w-1/2 h-[100vh]  flex-1 p-10 items-center  gap-20 py-28">
                <div>
                    <p className="text-center font-extrabold text-5xl">Contato</p>
                    <p className="font-medium text-gray-500 text-center">Entre em contato com nosco.</p>

                </div>
                <div className="flex  w-[50rem items-center gap-1 md:gap-12 text-center  flex-wrap flex-col md:flex-row">
                    <div className="h-44 flex flex-col items-center">
                        <Mail size={52} className="text-primaryPalet" />
                        <p className="text-xl font-bold text-primaryPalet">Email</p>
                        <div>
                        <p className="text-gray-600 font-medium">contato@panum.com</p>
                        </div>
                    </div>
                    <div className="h-44 flex flex-col items-center" >
                        <Phone size={52} className="text-primaryPalet" />
                        <div>
                            <p className="text-xl font-bold text-primaryPalet">Telefone</p>
                            <p className="text-gray-600 font-medium">{`(31)9999-9999`}</p>
                            <p className="text-gray-600 font-medium">{`(31)9999-9999`}</p>
                        </div>

                    </div>
                    <div className="h-44 flex flex-col items-center">
                        <Share2 size={52}  className="text-primaryPalet" />
                        <div>
                        <p className="text-xl font-bold text-primaryPalet">Redes Sociais</p>
                        <p className="text-gray-600 font-medium">@panun</p>
                        <p className="text-gray-600 font-medium">@panun</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}