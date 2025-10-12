export function getData(key: string) {
   const jsonValue = localStorage.getItem(key);

   const value = jsonValue != null ? JSON.parse(jsonValue) : null;

   return value;
}

export function setData(key: string, data: string) {
   localStorage.setItem(key, data);
}

export function saveToDB(username: string, email: string, password: string) {
   const users = getData('users') || {};

   const id = Object.keys(users).length + 1;

   const userObj = {
      username,
      email,
      password
   };

   users[id] = userObj;
   // console.log(users);

   setData('users', JSON.stringify(users));
}