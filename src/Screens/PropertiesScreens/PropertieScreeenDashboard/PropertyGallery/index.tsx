import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { DialogFormGalery } from "./DialogFormGalery";
import ImageEmpty from '@/assets/images/common/no-image.jpg'
export type PropertyGalleryProps = {
    idProperty: string;
    reloadEdit: () => void;
    images: string[];
};

export function PropertyGallery({ images, idProperty, reloadEdit }: PropertyGalleryProps) {
    return (
        <div className="space-y-4">
        <Card>
            <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between">
                <h2 className="text-2xl  font-bold">Galeria</h2>
                <DialogFormGalery idProperty={idProperty} images={images} reloadEdit={reloadEdit} />
                </div>
                <div className=" flex flex-row flex-wrap gap-2  bg-gray-100 p-4">
                    {!images || images?.length == 0 &&
                        <div>
                            <div className=" bg-white h-22 w-96 md:min-h-72 md:min-w-[22rem] relative object-cover" >

                                <Image src={ImageEmpty} fill className="absolute  pl-1 object-cover h-52 w-96" alt={`Imóvel `} />
                            </div>
                            <p>nenhuma imagen inserida na galeria</p>
                        </div>
                    }
                    {images.map((image, index) => (
                        <div className=" bg-white h-22 w-96 md:min-h-72 md:min-w-[22rem] relative object-cover" key={index}>

                            <Image src={image} fill className="absolute  pl-1 object-cover h-52 w-96" alt={`Imóvel ${index}`} />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        </div>
    );
}
