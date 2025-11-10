import React, { createContext, useState, useContext } from "react";
import type { TFormDataState, TFormData } from "./utils/types";

const FormDataContext = createContext<TFormData | undefined>(undefined);

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [formDataState, setFormDataState] = useState<TFormDataState>({});

  return (
    <FormDataContext.Provider value={{ formDataState, setFormDataState }}>
      {children}
    </FormDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormDataStateContext = () => {
  const context = useContext(FormDataContext);
  if (!context) throw new Error("Error in context");
  return context;
};
