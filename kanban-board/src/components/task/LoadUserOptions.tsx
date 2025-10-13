import { getData, type userObj } from "../../utils/shared";

function LoadUserOptions() {
   console.log("LoadUserOptions Rendered");
   const users = getData('users');

   return (
      <>
         {users.map(function(user: userObj) {
            return <option key={user.username}>{user.username}</option>
         })}
      </>
   );
}

export default LoadUserOptions;