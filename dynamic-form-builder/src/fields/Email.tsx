// import { useState } from "react";
import { isRequired } from "../utils/shared";
import type { TValidation } from "../utils/types";
import { useFormDataState } from "../FormContext";

type TEmailProps = {
   fieldId: string | undefined,
   label: string | undefined,
   placeholder: string | undefined,
   validations: TValidation[] | undefined,
}

function Email({
   fieldId,
   label,
   placeholder,
   validations,
}: TEmailProps) {
   // const [email, setEmail] = useState("");
   const {formDataState, setFormDataState} = useFormDataState();

   return (
      <div className="flex-row gap-2">
         <div>{isRequired(validations)} {label}</div>
         <input type="email"
         placeholder={placeholder?placeholder : ''}
         className="p-1.5 border w-3/4"
         onChange={(e) => {
            // setEmail(e.target.value);
            setFormDataState({
               ...formDataState,
               [fieldId!]: e.target.value,
            });
         }} />
      </div>
   );
}

export default Email;