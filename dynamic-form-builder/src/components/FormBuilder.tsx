import Radio from "./fields/Radio";
import type { TField, TForm } from "../utils/types";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import { createDependencyTree } from "../utils/shared";
import Select from "./fields/Select";
import Checkbox from "./fields/Checkbox";
import InputFactory from "./fields/InputFactory";
import { useEffect } from "react";

type TFormBuilderProps = {
   formData: TForm
};

function FormBuilder({formData}: TFormBuilderProps) {
   const methods = useForm<TField>({
      mode: 'all',
   });
   const { handleSubmit, reset } = methods;

   const fieldData = formData.fields;

   useEffect(() => {
      createDependencyTree(fieldData);
   }, [fieldData]);

   const onSubmit: SubmitHandler<TField> = (data) => {
      reset();
      alert("Form submission successful");
      setTimeout(() => {
         console.log(data);
      }, 2000);
   }

   return (
      <FormProvider {...methods}>
         <div className="flex flex-col m-10 border-2 p-8 w-1/2">
            <div className="text-3xl">{formData.title}</div>
            <form onSubmit={handleSubmit(onSubmit)}>
               {fieldData.map((field) => {
                  if (field.type === 'radio')
                        return <Radio
                           key={field.id}
                           fieldData={field}
                        />
                  else if (field.type === 'email'
                     || field.type === 'password'
                     || field.type === 'text'
                     || field.type === 'textarea'
                     || field.type === 'number')
                        return <InputFactory
                           key={field.id}
                           fieldData={field}
                        />
                  else if (field.type === 'select')
                        return <Select
                           key={field.id}
                           fieldData={field}
                        />
                  else if (field.type === 'checkbox')
                        return <Checkbox
                           key={field.id}
                           fieldData={field}
                        />
               })}

               <input type="submit" 
               className="p-2 border bg-green-500 mt-3 cursor-pointer text-white"/>
               
               <button className="ml-2 border p-2 cursor-pointer bg-blue-600 text-white"
                  onClick={() => reset()}
               >
                  Reset
               </button>
            </form>
         </div>
      </FormProvider>
   );
}

export default FormBuilder;