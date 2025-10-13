import { useState } from 'react';
import '../../assets/tailwind.css'
import { deleteTask, getAssignedUsers } from '../../utils/tasks';
import { useNavigate } from 'react-router';

export type OnUpdateType = () => void;

function Task({ id, title, description, createdBy, onUpdate }: {id: number, title: string, description: string, createdBy: string, onUpdate: OnUpdateType}) {
   console.log("TaskInfo Rendered");
   const [assignedUsers, setAssignedUsers] = useState<string>();

   const navigate = useNavigate();

   const showAssignedUsers = function() {
      const userList = getAssignedUsers(id);
      let userListString = '';
      for (const user of userList) {
         userListString += user;
         userListString += ';';
      }
      setAssignedUsers(userListString);
   }

   const handleEdit = function() {
      navigate(`/edit/${id}`);
   }

   const handleDelete = function() {
      deleteTask(id);
      alert('Task deleted successfully');
      onUpdate();
   }

   return (
      <div className="border m-2">
         <div>Title: <span className="font-bold">{title}</span></div>

         <div>
            {description}
         </div>

         <p>Created By: <span className="font-bold">{createdBy}</span></p>

         <button className="bg-blue-500 text-white font-semibold py-2 px-2 rounded" onClick={showAssignedUsers}>See Assigned Users</button>

         <div> {assignedUsers} </div>
         
         <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded m-2" onClick={handleEdit}>Edit</button>

         <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded m-2" onClick={handleDelete}>Delete</button>
      </div>
   );
}

export default Task;