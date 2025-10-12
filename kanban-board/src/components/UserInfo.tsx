import { getData } from "../utils/shared";
import "../assets/tailwind.css"
import { useNavigate } from "react-router";

function UserInfo() {
   console.log("UserInfo Rendered");
   const navigate = useNavigate();
   const handleLogout = function() {
      localStorage.removeItem("currUser");
      navigate("/login");
   }
   return (
      <div className="flex justify-between">
         <div className="text-2xl">Username: <span className="underline">{getData("currUser").username}</span></div>
         <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
      </div>
   );
}

export default UserInfo;