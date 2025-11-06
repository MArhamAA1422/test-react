import { createContext, useReducer, type ActionDispatch } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FormContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const FormDispatchContext = createContext<ActionDispatch<[action: any]>>(null);

export function FormContextProvider({ children }: { children: React.ReactNode}) {
   const [formContextData, dispatch] = useReducer(
      formDataReducer,
      initialFormData,
   );

   return (
      <FormContext value={formContextData}>
         <FormDispatchContext value={dispatch}>
            {children}
         </FormDispatchContext>
      </FormContext>
   );
}

function formDataReducer(form, action) {

}

const initialFormData = {};