// import { useState } from "react";
import { checkDependsOn, getData, isRequired, isVisible, mapValidationsToRules } from "../../utils/shared";
import type { TFieldProps } from "../../utils/types";
import { useFormDataState } from "../../FormContext";
import { useFormContext } from "react-hook-form";
import { usePrevFormDataState } from "../../PrevFormContext";
import { useEffect } from "react";

function Select({
   fieldData
}: TFieldProps) {
   const { id, validations, condition, dependsOn, label, placeholder, options } = fieldData;

   // const optionRef = useRef<HTMLSelectElement>(null);

   // context api
   const {formDataState, setFormDataState} = useFormDataState();
   const {prevFormDataState, setPrevFormDataState} = usePrevFormDataState();

   // validation
   const { register, formState: { errors }, resetField } = useFormContext();
   const rules = mapValidationsToRules(validations);

   // conditional stuffs
   const conditionField = condition?.field.replace("{{", "").replace("}}", "");
   const conditionOperator = condition?.operator;
   const conditionValue = condition?.value;

   const showField = isVisible(formDataState[conditionField!], conditionOperator!, conditionValue!);

   const isChanged = checkDependsOn(
      formDataState,
      prevFormDataState,
      dependsOn,
      getData("dependencyTree")
   );

   useEffect(() => {
      if (isChanged) {
         resetField(id!, { keepDirty: false });
      }
   }, [isChanged, resetField, id]);
   
   // if (dependsOn) {
   //    const isChanged = checkDependsOn(formDataState, prevFormDataState, dependsOn, getData('dependencyTree'));
   //    if (isChanged && optionRef.current) {
   //       optionRef.current.value = "";
   //    }
   // }

   if (!showField) {
      delete formDataState[id!];
      return (
         <></>
      );
   }

   return (
      <div className="flex-row gap-2 mt-3">
         <div>{isRequired(validations)} {label}</div>
         <select
            id={id}
            key={id}
            className="p-1 border"
            {...register(id!, rules)}
            onChange={e => {
               setPrevFormDataState({
                  ...prevFormDataState,
                  ...formDataState,
               });

               setFormDataState({
               ...formDataState,
               [id!]: e.target.value,
            })}}
            // ref={optionRef}
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
         {errors[id!] && (
         <p className="text-red-500 text-sm">
            {errors[id!]?.message as string}
         </p>
         )}
      </div>
   );
}

export default Select;