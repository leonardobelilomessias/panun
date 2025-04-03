
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  TvMinimalPlay } from "lucide-react";
import { VideoAccordion } from "./VideoAcordion";


export function VideosScreen(){
    return(
        <div className="sm:container pt-10 mx-2">
            <Card className="mt-4">
                <CardHeader>
                <CardTitle className="flex gap-5">
                    <TvMinimalPlay/>
                    Videos
                </CardTitle>
                <CardDescription>
                    Melhores videos para você está por dentro do tudo!
                </CardDescription>
                <CardContent>
                <VideoAccordion/>
                    
                </CardContent>
                </CardHeader>
                <CardFooter>
                </CardFooter>
                
            </Card>

        </div>
    )
}

function VideoCard(){
    return(
        <div>
            <div className="bg-gray-200 h-[170px] w-[300px] rounded"></div>
            <p className="px-1">como financiar o primeiro imovel</p>
        </div>
    )
}