type FieldType = "text" | "email" | "password" | "number" | "select" | "radio" | "checkbox";

export type TOption = {
   label: string,
   value: string,
};

export type TValidation = {
   rule: string,
   value?: string,
   message: string,
};

export type TCondition = {
   field: string,
   operator: string,
   value: string,
};

export type TField = {
   id: string,
   type: FieldType,
   name: string,
   label?: string,
   dependsOn?: string,
   defaultValue?: string,
   placeholder?: string,
   options?: TOption[],
   condition?: TCondition,
   validations?: TValidation[],
};

export type TForm = {
   formId: string,
   title: string,
   fields: TField[],
};