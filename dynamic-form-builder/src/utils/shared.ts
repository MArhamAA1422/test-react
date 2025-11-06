import type { TForm, TValidation } from "./types";

let formData: TForm;

export async function getFormData() {
   if (formData) return formData;
   // console.log("called");
   await fetch('/test.json')
      .then(res => res.json())
      .then((data) => {
         formData = data;
      });
   // console.log(formData);
   return formData;
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