import React, { createContext, useState, useContext } from "react";

export type FormDataState = { [key: string]: string };

type TFormData = {
  formDataState: FormDataState;
  setFormDataState: React.Dispatch<React.SetStateAction<FormDataState>>;
};

const FormDataContext = createContext<TFormData | undefined>(undefined);

export const FormDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [formDataState, setFormDataState] = useState<FormDataState>({});

  return (
    <FormDataContext.Provider value={{ formDataState, setFormDataState }}>
      {children}
    </FormDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormDataState = () => {
  const context = useContext(FormDataContext);
  if (!context) throw new Error("Error in context");
  return context;
};
