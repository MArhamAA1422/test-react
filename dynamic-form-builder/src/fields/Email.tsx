import { isRequired } from "../utils/shared";
import type { TEmail } from "../utils/types";

function Email({
   label,
   placeholder,
   validations,
}: TEmail) {

   return (
      <div className="flex-row gap-2">
         <div>{isRequired(validations)} {label}</div>
         <input type="email"
         placeholder={placeholder?placeholder : ''}
         className="" />
      </div>
   );
}

export default Email;