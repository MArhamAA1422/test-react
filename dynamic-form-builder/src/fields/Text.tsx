// import { useState } from "react";
import { isRequired, isVisible } from "../utils/shared";
import type { TCondition, TValidation } from "../utils/types";
import { useFormDataState } from "../FormContext";

type TTextProps = {
   fieldId: string | undefined,
   label: string | undefined,
   placeholder: string | undefined,
   condition: TCondition | undefined,
   validations: TValidation[] | undefined,
}

function Text({
   fieldId,
   label,
   placeholder,
   condition,
   validations,
}: TTextProps) {
   const {formDataState, setFormDataState} = useFormDataState();
   const conditionField = condition?.field.replace("{{", "").replace("}}", "");
   const conditionOperator = condition?.operator;
   const conditionValue = condition?.value;

   const showField = isVisible(formDataState[conditionField!], conditionOperator!, conditionValue!);

   if (!showField) {
      return (
         <></>
      );
   }

   return (
      <div className="flex-row gap-2">
         <div>{isRequired(validations)} {label}</div>
         <input type="text"
         placeholder={placeholder?placeholder : ''}
         className="p-1.5 border w-3/4"
         onChange={(e) => {
            setFormDataState({
               ...formDataState,
               [fieldId!]: e.target.value,
            });
         }} />
      </div>
   );
}

export default Text;