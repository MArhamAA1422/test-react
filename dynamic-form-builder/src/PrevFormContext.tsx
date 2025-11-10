import React, { createContext, useState, useContext } from "react";
import type { TFormDataState, TPrevFormData } from "./utils/types";

const PrevFormDataContext = createContext<TPrevFormData | undefined>(undefined);

export const PrevFormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [prevFormDataState, setPrevFormDataState] = useState<TFormDataState>({});

  return (
    <PrevFormDataContext.Provider value={{ prevFormDataState, setPrevFormDataState }}>
      {children}
    </PrevFormDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePrevFormDataStateContext = () => {
  const context = useContext(PrevFormDataContext);
  if (!context) throw new Error("Error in context");
  return context;
};