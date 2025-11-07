import { useState } from "react";
import type { TOption, TValidation } from "../utils/types";
import { isRequired, mapValidationsToRules } from "../utils/shared";
import { useFormDataState } from "../FormContext";
import { useFormContext } from "react-hook-form";

type TRadioProps = {
   fieldId: string | undefined,
   label: string | undefined,
   defaultValue: string | undefined | boolean,
   options: TOption[] | undefined,
   validations: TValidation[] | undefined,
}

function Radio({
   fieldId,
   label,
   defaultValue,
   options,
   validations,
}: TRadioProps) {
   const [checked, setChecked] = useState(defaultValue);

   // validations
   const { register, formState: { errors } } = useFormContext();
   const rules = mapValidationsToRules(validations);

   // data passing globally
   const {formDataState, setFormDataState} = useFormDataState();

   return (
      <div className="mt-3">
         {isRequired(validations)} {label}
         <div className="flex gap-5">
            {options?.map((option: TOption) => {
               return (
                  <div key={option.label}>
                     <input type="radio"
                     value={option.value}
                     id={option.value}
                     {...register(fieldId!, rules)}
                     name={option.label}
                     checked={checked===option.value}
                     onChange={() => {
                        setChecked(option.value);
                        setFormDataState({
                           ...formDataState,
                           [fieldId!]: option.value,
                        });
                     }}
                      />
                     <label className="ml-1">{option.label}</label>
                     {errors[fieldId!] && (
                     <p className="text-red-500 text-sm">
                        {errors[fieldId!]?.message as string}
                     </p>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Radio;