import { useState } from "react";
<<<<<<< HEAD:dynamic-form-builder/src/fields/Radio.tsx
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

=======
import type { TFieldProps, TOption } from "../../utils/types";
import { isRequired, mapValidationsToRules } from "../../utils/shared";
import { useFormDataState } from "../../FormContext";
import { useFormContext } from "react-hook-form";

function Radio({
   fieldData
}: TFieldProps) {
   const { id, defaultValue, label, validations, options } = fieldData;

   const [checked, setChecked] = useState(defaultValue);

>>>>>>> 2f233b3 (Refactor codebase):dynamic-form-builder/src/components/fields/Radio.tsx
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
<<<<<<< HEAD:dynamic-form-builder/src/fields/Radio.tsx
                     {...register(fieldId!, rules)}
=======
                     {...register(id!, rules)}
>>>>>>> 2f233b3 (Refactor codebase):dynamic-form-builder/src/components/fields/Radio.tsx
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
<<<<<<< HEAD:dynamic-form-builder/src/fields/Radio.tsx
                     {errors[fieldId!] && (
                     <p className="text-red-500 text-sm">
                        {errors[fieldId!]?.message as string}
=======
                     {errors[id!] && (
                     <p className="text-red-500 text-sm">
                        {errors[id!]?.message as string}
>>>>>>> 2f233b3 (Refactor codebase):dynamic-form-builder/src/components/fields/Radio.tsx
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