import { checkDependsOn, getData, isRequired, isVisible, mapValidationsToRules } from "../../utils/shared";
import type { TFieldProps } from "../../utils/types";
import { useFormDataStateContext } from "../../FormContext";
import { useFormContext } from "react-hook-form";
import { usePrevFormDataStateContext } from "../../PrevFormContext";
import { useEffect } from "react";

function Select({
   fieldData
}: TFieldProps) {
   const { id, validations, condition, dependsOn, label, placeholder, options } = fieldData;

   // context api
   const {formDataState, setFormDataState} = useFormDataStateContext();
   const {prevFormDataState, setPrevFormDataState} = usePrevFormDataStateContext();

   // validation
   const { register, formState: { errors }, resetField } = useFormContext();
   const rules = mapValidationsToRules(validations);

   // conditional stuffs
   const conditionField = condition?.field.replace("{{", "").replace("}}", "");
   const conditionOperator = condition?.operator;
   const conditionValue = condition?.value;

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

   if (!isVisible(formDataState[conditionField!], conditionOperator!, conditionValue!)) {
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