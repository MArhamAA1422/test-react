import { useState } from 'react';
import '../../assets/tailwind.css'
import { getAssignedUsers } from '../../utils/tasks';

function TaskInfo({ id, title, description, createdBy }: {id: number, title: string, description: string, createdBy: string}) {
   console.log("TaskInfo Rendered");
   const [assignedUsers, setAssignedUsers] = useState<string>();

   const showAssignedUsers = function() {
      const userList = getAssignedUsers(id);
      let userListString = '';
      for (const user of userList) {
         userListString += user;
         userListString += ';';
      }
      setAssignedUsers(userListString);
   }

   return (
      <div className="border">
         <div>Title: <span className="font-bold">{title}</span></div>
         <div>
            {description}
         </div>
         <p>Created By: <span className="font-bold">{createdBy}</span></p>
         <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded" onClick={showAssignedUsers}>See Assigned Users</button>
         <div> {assignedUsers} </div>
         <div>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Edit</button>
         </div>
      </div>
   );
}

export default TaskInfo;