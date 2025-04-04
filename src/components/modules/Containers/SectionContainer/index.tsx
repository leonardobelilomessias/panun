import React from 'react';
import { LucideProps } from 'lucide-react';

interface SectionContainerProps {
    children: React.ReactNode;
    className?: string;
    title?:string
    IconTitle:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

const SectionContainer: React.FC<SectionContainerProps> = ({title, children, className = '', IconTitle }) => {
    return (
    <div className={` bg-white rounded-lg   w-full${className}`}>
              <div className="flex items-center  ">
                <span className="text-gray-600 mr-2"><IconTitle size={24}/></span>
                <p className="text-lg md:text-xl font-semibold">{title}</p>
              </div>
        {children}

    </div>
    );
};

export default SectionContainer;