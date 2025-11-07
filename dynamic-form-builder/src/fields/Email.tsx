import { isRequired, mapValidationsToRules } from "../utils/shared";
import type { TValidation } from "../utils/types";
import { useFormDataState } from "../FormContext";
import { useFormContext } from "react-hook-form";

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
   const { register, formState: { errors } } = useFormContext();
   const rules = mapValidationsToRules(validations);
   const {formDataState, setFormDataState} = useFormDataState();

   return (
      <div className="flex-row gap-2 mt-3">
         <div>{isRequired(validations)} {label}</div>
         <input type="email"
         placeholder={placeholder?placeholder : ''}
         className="p-1.5 border w-3/4"
         {...register(fieldId!, rules)}
         onChange={(e) => {
            setFormDataState({
               ...formDataState,
               [fieldId!]: e.target.value,
            });
         }} />
         {errors[fieldId!] && (
         <p className="text-red-500 text-sm">
            {errors[fieldId!]?.message as string}
         </p>
         )}
      </div>
   );
}

export default Email;