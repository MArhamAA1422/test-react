import { useState } from "react";
import { getKanbanBoard, type TaskType } from "../../utils/tasks";
import Task from "./Task";

function LoadTask({ section }: {section: TaskType}) {
   console.log("LoadTask Rendered");
   const setCount = useState(0)[1];
   const kanbanBoard = getKanbanBoard();

   const handleUpdate = function() {
      setCount(function(prev) {
         return prev+1;
      })
   };

   return (
      <>
         {kanbanBoard?.map(function(task) {
            if (task.type === section) {
               return <Task key={task.id} id={task.id} title={task.title} description={task.description ? task.description : ''} createdBy={task.createdBy}
               onUpdate={handleUpdate} />
            }
         })}
      </>
   );
}

export default LoadTask;