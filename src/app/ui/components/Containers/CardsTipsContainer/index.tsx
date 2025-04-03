import React from 'react';

interface CardTipsContainerProps {
    children: React.ReactNode;
}
const CardTipsContainer: React.FC<CardTipsContainerProps> = ({ children }) => {
    return <div className="min-h-[340px] ">{children}</div>;
};

export default CardTipsContainer;