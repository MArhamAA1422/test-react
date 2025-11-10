import { checkDependsOn, getData, isRequired, isVisible, mapValidationsToRules } from "../../utils/shared";
import type { TFieldProps } from "../../utils/types";
import { useFormDataStateContext } from "../../FormContext";
import { useFormContext } from "react-hook-form";
import { usePrevFormDataStateContext } from "../../PrevFormContext";
import { useEffect } from "react";

function InputFactory({
   fieldData
}: TFieldProps) {
   const { id, condition, dependsOn, placeholder, label, validations, type } = fieldData;

   // context api
   const {formDataState, setFormDataState} = useFormDataStateContext();
   const {prevFormDataState, setPrevFormDataState} = usePrevFormDataStateContext();
   
   const conditionField = condition?.field.replace("{{", "").replace("}}", "");
   const conditionOperator = condition?.operator;
   const conditionValue = condition?.value;

   const { register, formState: { errors }, resetField } = useFormContext();

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
      return (
         <></>
      );
   }

   const rules = mapValidationsToRules(validations);

   return (
      <div className="flex-row gap-2 mt-3">
         <div>{isRequired(validations)} {label}</div>
         <input type={type}
            key={id}
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