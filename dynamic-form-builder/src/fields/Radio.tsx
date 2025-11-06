import { useState } from "react";
import type { TOption, TValidation } from "../utils/types";
// import { useForm } from "react-hook-form";
import { isRequired } from "../utils/shared";
import { useFormDataState } from "../FormContext";

type TRadioProps = {
   fieldId: string | undefined,
   label: string | undefined,
   defaultValue: string | undefined,
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
   // const {
   //    register,
   //    formState: { errors },
   // } = useForm<TField>();

   const {formDataState, setFormDataState} = useFormDataState();

   return (
      <div>
         {isRequired(validations)} {label}
         <div className="flex gap-5">
            {options?.map((option: TOption) => {
               return (
                  <div key={option.label}>
                     <input type="radio"
                     value={option.value}
                     id={option.value}
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
                     <label>{option.label}</label>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Radio;