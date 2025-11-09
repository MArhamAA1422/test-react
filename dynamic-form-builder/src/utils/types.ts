type FieldType = "text" | "email" | "password" | "number" | "select" | "radio" | "checkbox" | "textarea";

export type TFormDataState = { [key: string]: string };

<<<<<<< HEAD
=======
export type TFieldProps = { fieldData: TField }

>>>>>>> 2f233b3 (Refactor codebase)
export type TFormData = {
  formDataState: TFormDataState;
  setFormDataState: React.Dispatch<React.SetStateAction<TFormDataState>>;
};

export type TPrevFormData = {
  prevFormDataState: TFormDataState;
  setPrevFormDataState: React.Dispatch<React.SetStateAction<TFormDataState>>;
};

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

// required, email, minLength, maxLength, pattern, min, max, custom
export type TRules = {
   required?: string,
   email?: string,
   minLength?: {
      value: number,
      message: string,
   },
   maxLength?: {
      value: number,
      message: string,
   },
   pattern?: {
      value: RegExp,
      message: string,
   },
   min?: {
      value: number,
      message: string,
   },
   max?: {
      value: number,
      message: string
   },
}