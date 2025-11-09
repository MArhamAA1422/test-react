import Radio from "./fields/Radio";
import type { TField, TForm } from "../utils/types";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
// import { useFormDataState } from "../FormContext";
<<<<<<< HEAD
import Email from "../fields/Email";
import Text from "../fields/Text";
import Password from "../fields/Password";
import Select from "../fields/Select";
import Checkbox from "../fields/Checkbox";
import { createDependencyTree, setData } from "../utils/shared";
=======
import Select from "./fields/Select";
import Checkbox from "./fields/Checkbox";
import { createDependencyTree, setData } from "../utils/shared";
import InputFactory from "./fields/InputFactory";
>>>>>>> 2f233b3 (Refactor codebase)

type TFormBuilderProps = {
   formData: TForm
};

function FormBuilder({formData}: TFormBuilderProps) {
<<<<<<< HEAD
   const methods = useForm<TField>();
   const { handleSubmit } = methods;
=======
   const methods = useForm<TField>({
      mode: 'all',
   });
   const { handleSubmit, reset } = methods;
>>>>>>> 2f233b3 (Refactor codebase)

   const fieldData = formData.fields;
   const dependencyTree = createDependencyTree(fieldData);

   setData('dependencyTree', JSON.stringify(dependencyTree));

   const onSubmit: SubmitHandler<TField> = (data) => {
      alert("Form submission successful");
<<<<<<< HEAD
      console.log(data);
=======
      setTimeout(() => {
         console.log(data);
         reset();
      }, 2000);
>>>>>>> 2f233b3 (Refactor codebase)
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
<<<<<<< HEAD
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
=======
                           fieldData={field}
                        />
                     case 'email':
                     case 'password':
                     case 'text':
                     case 'textarea':
                     case 'number':
                        return <InputFactory
                           key={field.id}
                           fieldData={field}
>>>>>>> 2f233b3 (Refactor codebase)
                        />
                     case 'select':
                        return <Select
                           key={field.id}
<<<<<<< HEAD
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
=======
                           fieldData={field}
>>>>>>> 2f233b3 (Refactor codebase)
                        />
                     case 'checkbox':
                        return <Checkbox
                           key={field.id}
<<<<<<< HEAD
                           fieldId={field.id}
                           name={field.name}
                           label={field.label}
                           defaultValue={field.defaultValue}
=======
                           fieldData={field}
>>>>>>> 2f233b3 (Refactor codebase)
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