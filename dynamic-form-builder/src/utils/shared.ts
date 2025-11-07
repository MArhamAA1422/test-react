import type { TValidation, TRules, TFormDataState, TField } from "./types";

export function getData(key: string) {
   const jsonValue = localStorage.getItem(key);

   const value = jsonValue != null ? JSON.parse(jsonValue) : null;

   return value;
}

export function setData(key: string, data: string) {
   localStorage.setItem(key, data);
}

export function createDependencyTree(fieldData: TField[]) {
   const tree: TFormDataState = {};
   for (const key in fieldData) {
      tree[fieldData[key].id] = fieldData[key].dependsOn!;
   }
   console.log(tree);
   return tree;
}

export function isRequired(validations: TValidation[] | undefined) {
   let required = '';
   validations?.forEach((validation) => {
      if (validation.rule === 'required') {
         required = '*';
      }
   });
   return required;
}

export function checkDependsOn(formDataState: TFormDataState, prevFormDataState: TFormDataState, dependsOn: string | undefined, dependencyTree: TFormDataState) {
   console.log(formDataState[dependsOn!], prevFormDataState[dependsOn!]);
   if (!dependsOn) return false;
   if (!prevFormDataState[dependsOn!]) return true;
   if (!formDataState[dependsOn!]) return true;
   if (formDataState[dependsOn!] === prevFormDataState[dependsOn!]) return checkDependsOn(formDataState, prevFormDataState, dependencyTree[dependsOn], dependencyTree);
   return true;
}

export function isVisible(conditionField: string, conditionOperator: string, conditionValue: string) {
   // console.log(conditionField, conditionOperator, conditionValue);
   // if (String(conditionValue) === "") return false;
   if (!conditionField && !conditionOperator && !conditionValue) return true;
   if (!conditionField) return false;

   // why to do that? no type error!
   conditionField = String(conditionField);
   conditionOperator = String(conditionOperator);
   conditionValue = String(conditionValue);

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

export const mapValidationsToRules = (validations?: TValidation[]) => {
  if (!validations) return {};

  const rules: TRules = {};

  validations.forEach((v) => {
    switch (v.rule) {
      case "required":
        rules.required = v.message;
        break;

      case "email":
        rules.required = v.message;
        break;

      case "pattern":
        rules.pattern = {
          value: new RegExp(v.value!),
          message: v.message,
        };
        break;

      case "minLength":
        rules.minLength = {
          value: Number(v.value),
          message: v.message || `Must be at least ${v.value} characters`,
        };
        break;

      case "maxLength":
        rules.maxLength = {
          value: Number(v.value),
          message: v.message || `Must be at max ${v.value} characters`,
        };
        break;
      
      case "min":
         rules.min = {
            value: Number(v.value),
            message: v.message || `Must be at least ${v.value}`,
         }
         break;
      case "max":
         rules.max = {
            value: Number(v.value),
            message: v.message || `Must be at max ${v.value}`,
         }
         break;
    }
  });

  return rules;
};
