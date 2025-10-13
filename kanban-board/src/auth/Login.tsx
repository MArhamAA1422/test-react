import { useRef } from 'react';
import { useNavigate } from 'react-router';
import '../assets/tailwind.css'
import { getData, setData } from '../utils/shared';

function Login() {
   console.log('Login Rendered');
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   const navigate = useNavigate();

   const handleLogin = function(e: React.FormEvent) {
      e.preventDefault();
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      const users = getData("users");

      for (const user in users) {
         if (users[user].email === email && users[user].password === password) {
            const currUser = {
               id: user,
               username: users[user].username
            };

            setData('currUser', JSON.stringify(currUser));
            navigate("/");
            return;
         }
      }

      alert('Invalid email or password, authentication failed.');
   }

   const handleCreateAccount = function() {
      navigate("/registration");
   }

   return (
      <form className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={handleLogin}>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>

      <div>
         <label className="block text-gray-600 mb-1">
            Email
         </label>
         <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ref={emailRef}
         />
      </div>

      <div>
         <label className="block text-gray-600 mb-1">
            Password
         </label>
         <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ref={passwordRef}
         />
      </div>

      <button
         type="submit"
         className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
      >
         Login
      </button>

      Don't have an account?
      <div className="font-bold hover:underline cursor-pointer" onClick={handleCreateAccount}>Create account here</div>
      </form>
   );
}

export default Login;
