import { useNavigate, useParams } from "react-router";
import { taskInfo, updateTask, type TaskType } from "../../utils/tasks";
import { useRef, useState } from "react";
import LoadUserOptions from "./LoadUserOptions";

function EditTask() {
   console.log("EditTask Rendered");
   const titleRef = useRef<HTMLInputElement>(null);
   const descriptionRef = useRef<HTMLInputElement>(null);
   const sectionRef = useRef<HTMLSelectElement>(null);
   const assignUserRef = useRef<HTMLSelectElement>(null);

   const navigate = useNavigate();

   const { id } = useParams<{ id: string }>();
   const task = taskInfo(Number(id));

   const [title, setTitle] = useState(task.title);
   const [description, setDescription] = useState(task.description);

   const handleSave = function() {
      const newTitle = titleRef.current?.value;
      const newDescription = descriptionRef.current?.value;
      const selectedSection = sectionRef.current?.value;
      const selectedUser = assignUserRef.current?.value;

      if (newTitle?.trim().length === 0) {
         alert('Provide valid title');
         return;
      }

      let sectionType: TaskType;
      switch(selectedSection) {
         case 'todo':
            sectionType = 'todo';
            break;
         case 'inprogress':
            sectionType = 'inprogress';
            break;
         case 'testing':
            sectionType = 'testing';
            break;
         case 'finished':
            sectionType = 'finished';
            break;
      }

      updateTask(Number(id), newTitle!, newDescription!, sectionType!, selectedUser!);
      navigate("/");
   };

   return (
      <>
         <h1 className="m-4">Edit Task Here</h1>
         { task.id !== -1 ? 
         <div className="border m-2 p-10 flex flex-col">
            <p>*Title</p>
            <input placeholder="Write new title" className="border p-3 m-1"
            value={title}
            onChange={e => setTitle(e.target.value)}
            ref={titleRef} />

            <p className="m-2">Description</p>
            <input placeholder="Write new description" className="border p-3 m-1" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            ref={descriptionRef} />

            <p className="m-2 font-bold">Assign User</p>
            <select className="border-2"
            ref={assignUserRef}>
               <LoadUserOptions />
            </select>

            <p className="m-2 font-bold">Select Section</p>
            <select className="border-2"
            defaultValue={task.type}
            ref={sectionRef}>
               <option>todo</option>
               <option>inprogress</option>
               <option>testing</option>
               <option>finished</option>
            </select>

            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded m-2" onClick={handleSave}>Save</button>
         </div>
         : <h1>Nothing to edit</h1> }
      </>
   );
}

export default EditTask;