import { useRef } from 'react';
import { useNavigate } from 'react-router';
import '../assets/tailwind.css'
import { getData, saveToDB } from '../utils/shared';

function Registration() {
   console.log('Registration Rendered');
   const emailRef = useRef<HTMLInputElement>(null);
   const passwordRef = useRef<HTMLInputElement>(null);
   const usernameRef = useRef<HTMLInputElement>(null);
   const navigate = useNavigate();

   const handleLogin = function(e: React.FormEvent) {
      e.preventDefault();
      const username = usernameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      const users = getData('users');
      let found = false;

      if (users) {
         for (const key in users) {
            if (users[key].email === email) {
               found = true;
            }
            if (users[key].username === username) {
               found = true;
            }
         }
      }

      if (!username || !email || !password) {
         alert('Provide proper information.');
         return;
      }

      if (found) {
         alert('This username or email already exist.');
      } else {
         alert('User created successfully.');
         saveToDB(username!, email!, password!);
         navigate("/login");
      }
   }

   const handleSignIn = function() {
      navigate("/login");
   }

   return (
      <form className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={handleLogin}>
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Registration</h2>

      <div>
         <label className="block text-gray-600 mb-1">
            Username
         </label>
         <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ref={usernameRef}
         />
      </div>

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
         Registration
      </button>

      Already have account?
      <div className="font-bold hover:underline cursor-pointer" onClick={handleSignIn}>Sign in</div>
      
      </form>
   );
}

export default Registration;
