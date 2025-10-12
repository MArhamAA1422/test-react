export function getData(key: string) {
   const jsonValue = localStorage.getItem(key);

   const value = jsonValue != null ? JSON.parse(jsonValue) : null;

   return value;
}

export function setData(key: string, data: string) {
   localStorage.setItem(key, data);
}

export function loadHomePage() {
   window.location.href = "../pages/KanbanBoard.html";
}