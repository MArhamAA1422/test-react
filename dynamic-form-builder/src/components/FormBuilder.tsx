import Radio from "../fields/Radio";
import type { TField, TForm } from "../utils/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useFormDataState } from "../FormContext";
import Email from "../fields/Email";
import Text from "../fields/Text";
import Password from "../fields/Password";
import Select from "../fields/Select";

type TFormBuilderProps = {
   formData: TForm
};

function FormBuilder({formData}: TFormBuilderProps) {
   const fieldData = formData.fields;
   const {
      handleSubmit
   } = useForm<TField>();
   const onSubmit: SubmitHandler<TField> = (data) => console.log(data);
   
   const {formDataState} = useFormDataState();
   console.log(formDataState);

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
                  case 'email':
                     return <Email
                        key={field.id}
                        fieldId={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        validations={field.validations}
                     />
                  case 'text':
                     return <Text
                        key={field.id}
                        fieldId={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        condition={field.condition}
                        validations={field.validations}
                     />
                  case 'password':
                     return <Password
                        key={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        validations={field.validations}
                     />
                  case 'select':
                     return <Select
                        key={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
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