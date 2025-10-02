import React, { createContext, useContext, useState } from 'react';
import { Meal } from '../../api/types';

interface MealListContextType {
  mealList: Meal[];
  setMealList: (list: Meal[]) => void;
}

const MealListContext = createContext<MealListContextType | undefined>(undefined);

export const MealListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mealList, setMealList] = useState<Meal[]>([]);
  return (
    <MealListContext.Provider value={{ mealList, setMealList }}>
      {children}
    </MealListContext.Provider>
  );
};

export function useMealList() {
  const context = useContext(MealListContext);
  if (!context) throw new Error("useMealList must be used within MealListProvider");
  return context;
}