// import { useState } from "react";
import { checkDependsOn, getData, isRequired, isVisible, mapValidationsToRules } from "../../utils/shared";
import type { TFieldProps } from "../../utils/types";
import { useFormDataState } from "../../FormContext";
import { useFormContext } from "react-hook-form";
import { usePrevFormDataState } from "../../PrevFormContext";
import { useRef } from "react";

function InputFactory({
   fieldData
}: TFieldProps) {
   const { id, condition, dependsOn, placeholder, label, validations, type } = fieldData;

   const textRef = useRef<HTMLInputElement>(null);

   // context api
   const {formDataState, setFormDataState} = useFormDataState();
   const {prevFormDataState, setPrevFormDataState} = usePrevFormDataState();
   
   const conditionField = condition?.field.replace("{{", "").replace("}}", "");
   const conditionOperator = condition?.operator;
   const conditionValue = condition?.value;

   const { register, formState: { errors } } = useFormContext();

   const showField = isVisible(formDataState[conditionField!], conditionOperator!, conditionValue!);

   if (dependsOn) {
      const isChanged = checkDependsOn(formDataState, prevFormDataState, dependsOn, getData('dependencyTree'));
      if (isChanged && textRef.current) {
         textRef.current.value = "";
      }
   }

   if (!showField) {
      return (
         <></>
      );
   }

   const rules = mapValidationsToRules(validations);

   return (
      <div className="flex-row gap-2 mt-3">
         <div>{isRequired(validations)} {label}</div>
         <input type={type}
            placeholder={placeholder?placeholder : ''}
            className="p-1.5 border w-1/2"
            {...register(id!, rules)}
            onChange={(e) => {
               setPrevFormDataState({
                  ...prevFormDataState,
                  ...formDataState,
               });

               setFormDataState({
                  ...formDataState,
                  [id!]: e.target.value,
               });
            }}
            ref={textRef}
         />
         {errors[id!] && (
         <p className="text-red-500 text-sm">
            {errors[id!]?.message as string}
         </p>
         )}
      </div>
   );
}

export default InputFactory;