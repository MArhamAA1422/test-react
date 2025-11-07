import Radio from "../fields/Radio";
import type { TField, TForm } from "../utils/types";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
// import { useFormDataState } from "../FormContext";
import Email from "../fields/Email";
import Text from "../fields/Text";
import Password from "../fields/Password";
import Select from "../fields/Select";
import Checkbox from "../fields/Checkbox";
import { createDependencyTree, setData } from "../utils/shared";

type TFormBuilderProps = {
   formData: TForm
};

function FormBuilder({formData}: TFormBuilderProps) {
   const methods = useForm<TField>();
   const { handleSubmit } = methods;

   const fieldData = formData.fields;
   const dependencyTree = createDependencyTree(fieldData);

   setData('dependencyTree', JSON.stringify(dependencyTree));

   const onSubmit: SubmitHandler<TField> = (data) => {
      alert("Form submission successful");
      console.log(data);
   }
   
   // const {formDataState} = useFormDataState();
   // console.log(formDataState);

   return (
      <FormProvider {...methods}>
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
                           dependsOn={field.dependsOn}
                           placeholder={field.placeholder}
                           condition={field.condition}
                           validations={field.validations}
                        />
                     case 'password':
                        return <Password
                           key={field.id}
                           fieldId={field.id}
                           label={field.label}
                           placeholder={field.placeholder}
                           validations={field.validations}
                        />
                     case 'select':
                        return <Select
                           key={field.id}
                           fieldId={field.id}
                           label={field.label}
                           placeholder={field.placeholder}
                           dependsOn={field.dependsOn}
                           condition={field.condition}
                           options={field.options}
                           validations={field.validations}
                        />
                     case 'textarea':
                        return <Text
                           key={field.id}
                           fieldId={field.id}
                           label={field.label}
                           placeholder={field.placeholder}
                           condition={field.condition}
                           validations={field.validations}
                        />
                     case 'number':
                        return <Text
                           key={field.id}
                           fieldId={field.id}
                           label={field.label}
                           placeholder={field.placeholder}
                           validations={field.validations}
                        />
                     case 'checkbox':
                        return <Checkbox
                           key={field.id}
                           fieldId={field.id}
                           name={field.name}
                           label={field.label}
                           defaultValue={field.defaultValue}
                        />
                  }
               })}

               <input type="submit" 
               className="p-2 border bg-green-500 mt-3 cursor-pointer text-white"/>
            </form>
         </div>
      </FormProvider>
   );
}

export default FormBuilder;