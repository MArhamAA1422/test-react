import Radio from "./fields/Radio";
import type { TField, TForm } from "../utils/types";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
// import { useFormDataState } from "../FormContext";
import { createDependencyTree, setData } from "../utils/shared";
import Select from "./fields/Select";
import Checkbox from "./fields/Checkbox";
import InputFactory from "./fields/InputFactory";

type TFormBuilderProps = {
   formData: TForm
};

function FormBuilder({formData}: TFormBuilderProps) {
   const methods = useForm<TField>({
      mode: 'all',
   });
   const { handleSubmit, reset } = methods;

   const fieldData = formData.fields;
   const dependencyTree = createDependencyTree(fieldData);

   setData('dependencyTree', JSON.stringify(dependencyTree));

   const onSubmit: SubmitHandler<TField> = (data) => {
      alert("Form submission successful");
      console.log(data);
      setTimeout(() => {
         console.log(data);
         reset();
      }, 2000);
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
                        />
                     case 'select':
                        return <Select
                           key={field.id}
                           fieldData={field}
                        />
                     case 'checkbox':
                        return <Checkbox
                           key={field.id}
                           fieldData={field}
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