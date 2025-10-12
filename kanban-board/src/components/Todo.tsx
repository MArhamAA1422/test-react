import LoadTask from "./task/LoadTask";
import '../assets/tailwind.css'
import { useRef } from "react";
import { addTask } from "../utils/tasks";

function Todo() {
   const titleRef = useRef<HTMLInputElement>(null);
   const descriptionRef = useRef<HTMLInputElement>(null);

   const handleAddTask = function() {
      const title = titleRef.current?.value;
      const description = descriptionRef.current?.value;
      if (title?.trim().length === 0) {
         alert('Provide valid title.');
      } else {
         // addTask(title, description);
      }
   }

   return (
      <div id="todo" className="border-2">
         <div className="text-5xl">TODO Section</div>
         <div className="flex flex-col">
            <p>*Title</p>
            <input placeholder="Title goes here" className="border"
            ref={titleRef} />
            <p>Description</p>
            <input placeholder="Task description" className="border" 
            ref={descriptionRef} />
            <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded" onClick={handleAddTask}>Add</button>
         </div>
         {/* <div className="add-task-tooltip js-add-task-tooltip-todo hidden">Adding new task</div> */}
         <div className="task-container todo-tasks">
            <LoadTask section={'todo'} />
         </div>
      </div>
   )
}

export default Todo;