// import { useState } from "react";
import { checkDependsOn, getData, isRequired, isVisible, mapValidationsToRules } from "../utils/shared";
import type { TCondition, TValidation } from "../utils/types";
import { useFormDataState } from "../FormContext";
import { useFormContext } from "react-hook-form";
import { usePrevFormDataState } from "../PrevFormContext";
import { useRef } from "react";

type TTextProps = {
   fieldId: string | undefined,
   label: string | undefined,
   placeholder: string | undefined,
   dependsOn?: string | undefined,
   condition?: TCondition | undefined,
   validations: TValidation[] | undefined,
}

function Text({
   fieldId,
   label,
   placeholder,
   dependsOn,
   condition,
   validations,
}: TTextProps) {
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
      const isSame = checkDependsOn(formDataState, prevFormDataState, dependsOn, getData('dependencyTree'));
      if (!isSame && textRef.current) {
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
         <input type="text"
         placeholder={placeholder?placeholder : ''}
         className="p-1.5 border w-3/4"
         {...register(fieldId!, rules)}
         onChange={(e) => {
            setPrevFormDataState({
               ...prevFormDataState,
               ...formDataState,
            });

            setFormDataState({
               ...formDataState,
               [fieldId!]: e.target.value,
            });
         }}
         ref={textRef}
         />
         {errors[fieldId!] && (
         <p className="text-red-500 text-sm">
            {errors[fieldId!]?.message as string}
         </p>
         )}
      </div>
   );
}

export default Text;