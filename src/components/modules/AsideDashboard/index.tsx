"use client"
import React from "react";
import { AsideButtons } from "./AsideButtons";
import { AccontProvider } from "@/context/ContextUserAccont";

export const AsideDashBoard= React.memo(()=>{
return(
    <AccontProvider>
            <aside className="w-[14.9%]  lg:w-[12%] hidden md:block fixed border-r h-full border-gray-200    overflow-y-scroll pb-20">
            <AsideButtons />
        </aside>
    </AccontProvider>
    )
})

AsideDashBoard.displayName = "AsideDashBoard"