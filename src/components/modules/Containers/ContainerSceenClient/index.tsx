import React from 'react';

export const ContainerSceenClient =  ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-4 min-h-screen pt-12  mx-auto">
            {children}
        </div>
    );
};
