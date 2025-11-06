import { useContext } from "react";
import Radio from "../fields/Radio";
import type { TField, TForm } from "../utils/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FormContext } from "../FormContext";

type TFormBuilderProps = {
   formData: TForm
};

function FormBuilder({formData}: TFormBuilderProps) {
   const fieldData = formData.fields;
   const {
      handleSubmit
   } = useForm<TField>()
   const onSubmit: SubmitHandler<TField> = (data) => console.log(data)
   
   const formContextData = useContext(FormContext);
   console.log(formContextData);

   return (
      <div className="flex flex-col m-10">
         <div className="text-3xl">{formData.title}</div>
         <form onSubmit={handleSubmit(onSubmit)}>
            {fieldData.map((field) => {
               switch(field.type) {
                  case 'radio':
                     return <Radio
                        key={field.id}
                        fieldId={field.id}
                        label={field.label}
                        defaultValue={field.defaultValue}
                        options={field.options}
                        validations={field.validations}
                     />
               }
            })}

            <input type="submit" />
         </form>
      </div>
   );
}

export default FormBuilder;