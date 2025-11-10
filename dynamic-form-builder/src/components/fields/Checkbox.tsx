import { useFormDataStateContext } from "../../FormContext";
import { useState } from 'react';
import type { TFieldProps } from "../../utils/types";

function Checkbox({
   fieldData
}: TFieldProps) {
   const { id, defaultValue, name, label } = fieldData;

   const {formDataState, setFormDataState} = useFormDataStateContext();
   const [check, setCheck] = useState(Boolean(defaultValue));

   return (
      <div className="flex-row gap-2 mt-3">
         <input type="checkbox" id={id}
            name={name}
            checked={check}
            key={id}
            onChange={(e) => {
                  setFormDataState({
                  ...formDataState,
                  [id!]: String(e.target.checked),
               })
               setCheck(!check);
            }}
         />
         <label className="ml-2">{label}</label>
      </div>
   );
}

export default Checkbox;