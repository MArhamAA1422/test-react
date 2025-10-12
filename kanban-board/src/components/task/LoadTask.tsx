import { getKanbanBoard, type TaskType } from "../../utils/tasks";
import TaskInfo from "./TaskInfo";

function LoadTask({ section }: {section: TaskType}) {
   console.log("LoadTask Rendered");
   const kanbanBoard = getKanbanBoard();

   return (
      <>
         <TaskInfo id={1} title="Sample title" description="some text" createdBy={"Test"}/>
         {kanbanBoard?.forEach(function(task) {
            if (task.type === section) {
               return <TaskInfo id={task.id} title={task.title} description={task.description ? task.description : ''} createdBy={task.createdBy} />
            }
         })}
      </>
   );
}

export default LoadTask;