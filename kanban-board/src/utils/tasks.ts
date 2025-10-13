import { getData, setData } from "./shared";

export type TaskType = 'todo' | 'inprogress' | 'testing' | 'finished';

type Task = {
   id: number,
   title: string,
   type: TaskType,
   createdBy: string,
   description?: string,
   assignedUser?: string[],
};

type KanbanBoardType = Task[];

export function getKanbanBoard() {
   const kanbanBoard: KanbanBoardType = getData('kanbanBoard');
   return kanbanBoard;
}

export function getAssignedUsers(taskID: number) {
   const kanbanBoard = getKanbanBoard();
   let userList: string[] = [];
   kanbanBoard?.forEach(function(task) {
      if (task.id === taskID) {
         if (task.assignedUser) userList = task.assignedUser;
      }
   });
   return userList;
}

export function addTask(username: string, section: TaskType, title: string, description: string) {
   let kanbanBoard: KanbanBoardType = getData('kanbanBoard');

   if (!kanbanBoard) kanbanBoard = [];

   let ID = getData('taskId');
   if (ID === null) ID = 0;

   const id = ID + 1;
   setData('taskId', JSON.stringify(ID+1));

   kanbanBoard.push({
      id,
      title,
      type: section,
      createdBy: username,
      description,
      assignedUser: [],
   });

   setData('kanbanBoard', JSON.stringify(kanbanBoard));
}