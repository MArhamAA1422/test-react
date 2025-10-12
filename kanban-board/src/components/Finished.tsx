function Finished() {
   return (
      <div id="todo">
         <div className="text-5xl">Finished Section</div>
         <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Add Task
         </button>
         <div className="">
            <input placeholder="Title goes here" />
            <input placeholder="Task description" />
            <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded">Add</button>
         </div>
         {/* <div className="add-task-tooltip js-add-task-tooltip-todo hidden">Adding new task</div> */}
         <div className="task-container todo-tasks">
         </div>
      </div>
   )
}

export default Finished;