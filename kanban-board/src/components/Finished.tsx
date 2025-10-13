import LoadTask from "./task/LoadTask";
import { useRef, useState } from "react";
import { addTask } from "../utils/tasks";
import { getData } from "../utils/shared";

function Finished() {
   console.log("Finished Rendered");
   const [loadPage, setLoadPage] = useState(false);

   const titleRef = useRef<HTMLInputElement>(null);
   const descriptionRef = useRef<HTMLInputElement>(null);

   const handleAddTask = function() {
      const title = titleRef.current?.value;
      const description = descriptionRef.current?.value;

      if (title?.trim().length === 0) {
         alert('Provide valid title');

      } else {
         addTask(getData('currUser').username, 'finished', title!, description ? description : '');
         alert('Task added successfully');
         const newLoadPage = !loadPage;
         setLoadPage(newLoadPage);
      }
   }

   return (
      <div className="border-2 p-2 m-3">
         <div className="text-5xl">Finished Section</div>
         <div className="flex flex-col">
            <p>*Title</p>
            <input placeholder="Title goes here" className="border"
            ref={titleRef} />

            <p>Description</p>
            <input placeholder="Task description" className="border" 
            ref={descriptionRef} />

            <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded m-2" onClick={handleAddTask}>Add</button>
         </div>

         <div className="flex flex-row gap-1 flex-wrap justify-center">
            <LoadTask section={'finished'} />
         </div>
      </div>
   )
}

export default Finished;