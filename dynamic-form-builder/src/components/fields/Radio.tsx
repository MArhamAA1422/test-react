import { useState } from "react";
import type { TFieldProps, TOption } from "../../utils/types";
import { useFormContext } from "react-hook-form";
import { isRequired, mapValidationsToRules } from "../../utils/shared";
import { useFormDataStateContext } from "../../FormContext";


function Radio({
   fieldData
}: TFieldProps) {
   const { id, defaultValue, label, validations, options } = fieldData;

   const [checked, setChecked] = useState(defaultValue);

   // validations
   const { register, formState: { errors } } = useFormContext();
   const rules = mapValidationsToRules(validations);

   // data passing globally
   const {formDataState, setFormDataState} = useFormDataStateContext();

   return (
      <div className="mt-3">
         {isRequired(validations)} {label}
         <div className="flex gap-5">
            {options?.map((option: TOption) => {
               return (
                  <div key={option.label}>
                     <input type="radio"
                        key={id}
                        value={option.value}
                        id={option.value}
                        {...register(id!, rules)}
                        name={option.label}
                        checked={checked===option.value}
                        onChange={() => {
                           setChecked(option.value);
                           setFormDataState({
                              ...formDataState,
                              [id!]: option.value,
                           });
                        }}
                      />
                     <label className="ml-1">{option.label}</label>
                     {errors[id!] && (
                     <p className="text-red-500 text-sm">
                        {errors[id!]?.message as string}
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