import React from 'react';

export const ContainerScreen =  ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-4 min-h-screen pt-12  mx-auto">
            {children}
        </div>
    );
};
