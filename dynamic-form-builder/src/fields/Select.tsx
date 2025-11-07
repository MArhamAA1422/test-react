// import { useState } from "react";
import { checkDependsOn, isRequired, isVisible, mapValidationsToRules } from "../utils/shared";
import type { TCondition, TOption, TValidation } from "../utils/types";
import { useFormDataState } from "../FormContext";
import { useFormContext } from "react-hook-form";
import { usePrevFormDataState } from "../PrevFormContext";
import { useRef } from "react";

type TSelectProps = {
   fieldId: string | undefined,
   // name: string | undefined,
   label: string | undefined,
   placeholder: string | undefined,
   dependsOn?: string | undefined,
   condition?: TCondition | undefined,
   options: TOption[] | undefined,
   validations: TValidation[] | undefined,
}

function Select({
   fieldId,
   label,
   placeholder,
   dependsOn,
   condition,
   options,
   validations,
}: TSelectProps) {
   const optionRef = useRef<HTMLSelectElement>(null);

   // context api
   const {formDataState, setFormDataState} = useFormDataState();
   const {prevFormDataState, setPrevFormDataState} = usePrevFormDataState();

   // validation
   const { register, formState: { errors } } = useFormContext();
   const rules = mapValidationsToRules(validations);

   // conditional stuffs
   const conditionField = condition?.field.replace("{{", "").replace("}}", "");
   const conditionOperator = condition?.operator;
   const conditionValue = condition?.value;

   const showField = isVisible(formDataState[conditionField!], conditionOperator!, conditionValue!);
   
   if (dependsOn) {
      const isSame = checkDependsOn(formDataState, prevFormDataState, dependsOn);
      if (!isSame && optionRef.current) {
         optionRef.current.value = "";
      }
   }

   if (!showField) {
      delete formDataState[fieldId!];
      return (
         <></>
      );
   }

   return (
      <div className="flex-row gap-2 mt-3">
         <div>{isRequired(validations)} {label}</div>
         <select
            id={fieldId}
            className="p-1 border"
            {...register(fieldId!, rules)}
            onChange={e => {
               setPrevFormDataState({
                  ...prevFormDataState,
                  ...formDataState,
               });

               setFormDataState({
               ...formDataState,
               [fieldId!]: e.target.value,
            })}}
            ref={optionRef}
         >
            <option key={placeholder} value="">{placeholder}</option>
            {options?.map(option => {
               return (
                  <option key={option.value} value={option.value}
                  >{option.label}
                  </option>
               );
            })}
         </select>
         {errors[fieldId!] && (
         <p className="text-red-500 text-sm">
            {errors[fieldId!]?.message as string}
         </p>
         )}
      </div>
   );
}

export default Select;