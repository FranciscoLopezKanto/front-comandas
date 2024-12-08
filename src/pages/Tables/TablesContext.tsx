import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define el tipo de estado para la mesa
interface Table {
  id: number;
  status: number; // 0 = libre, 1 = ocupada
}

// Define el contexto
interface TablesContextType {
  tables: Table[];
  setTableStatus: (id: number, status: number) => void;
}

const TablesContext = createContext<TablesContextType | undefined>(undefined);

interface TablesProviderProps {
  children: ReactNode;
}

export const TablesProvider = ({ children }: TablesProviderProps) => {
  const [tables, setTables] = useState<Table[]>(Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    status: 0, // Todas las mesas empiezan como libres
  })));

  const setTableStatus = (id: number, status: number) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, status } : table
      )
    );
  };

  return (
    <TablesContext.Provider value={{ tables, setTableStatus }}>
      {children}
    </TablesContext.Provider>
  );
};

export const useTables = (): TablesContextType => {
  const context = useContext(TablesContext);
  if (!context) {
    throw new Error('useTables must be used within a TablesProvider');
  }
  return context;
};
