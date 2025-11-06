import type { TValidation } from "./types";

export function isRequired(validations: TValidation[] | undefined) {
   let required = '';
   validations?.forEach((validation) => {
      if (validation.rule === 'required') {
         required = '*';
      }
   });
   return required;
}

export function isVisible(conditionField: string, conditionOperator: string, conditionValue: string) {
   // ===, !==, >, <, >=, <=, includes, !includes
   // console.log(conditionField, conditionOperator, conditionValue);
   if (String(conditionValue) === "") return false;
   switch(conditionOperator) {
      case "===":
         if (conditionField === conditionValue) {
            return true
         }
         break;
      case "!==":
         if (conditionField !== conditionValue) {
            return true
         }
         break;
      case ">":
         if (conditionField > conditionValue) {
            return true
         }
         break;
      case "<":
         if (conditionField < conditionValue) {
            return true
         }
         break;
      case ">=":
         if (conditionField >= conditionValue) {
            return true
         }
         break;
      case "<=":
         if (conditionField <= conditionValue) {
            return true
         }
         break;
      case "includes":
         if (conditionField.includes(conditionValue)) {
            return true
         }
         break;
      case "!includes":
         if (!conditionField.includes(conditionValue)) {
            return true
         }
         break;
   }
   return false
}