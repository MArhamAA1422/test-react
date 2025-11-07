import { useFormDataState } from "../FormContext";
import { useState } from 'react';

type TCheckboxProps = {
   fieldId: string | undefined,
   name: string | undefined,
   label: string | undefined,
   defaultValue: boolean | string | undefined,
}

function Checkbox({
   fieldId,
   name,
   label,
   defaultValue,
}: TCheckboxProps) {
   const {formDataState, setFormDataState} = useFormDataState();
   const [check, setCheck] = useState(Boolean(defaultValue));

   return (
      <div className="flex-row gap-2 mt-3">
         <input type="checkbox" id={fieldId}
            name={name}
            checked={check}
            key={fieldId}
            onChange={(e) => {
                  setFormDataState({
                  ...formDataState,
                  [fieldId!]: String(e.target.checked),
               })
               setCheck(!check);
            }}
         />
         <label className="ml-2">{label}</label>
      </div>
   );
}

export default Checkbox;