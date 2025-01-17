import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Maintenance {
    id: number;
    status: string;
}

interface MaintenanceContextType {
    statuses: Record<number, string>;
    setStatuses: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export const MaintenanceProvider = ({ children }: { children: ReactNode }) => {
    const [statuses, setStatuses] = useState<Record<number, string>>({});

    return (
        <MaintenanceContext.Provider value={{ statuses, setStatuses }}>
            {children}
        </MaintenanceContext.Provider>
    );
};

export const useMaintenance = () => {
    const context = useContext(MaintenanceContext);
    if (!context) {
        throw new Error('useMaintenance must be used within a MaintenanceProvider');
    }
    return context;

    
};

