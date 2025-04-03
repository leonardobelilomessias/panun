import React from 'react';

interface CardTipsContainerProps {
    children: React.ReactNode;
}
const CardsContainerGeneric: React.FC<CardTipsContainerProps> = ({ children }) => {
    return <div className="h-[340px] ">{children}</div>;
};

export default CardsContainerGeneric;