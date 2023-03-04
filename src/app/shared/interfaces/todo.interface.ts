export interface IUserToDoListItem {
  id: string;
  text: string;
}

export interface IUserToDoList {
  id: string;
  header: string;
  items: IUserToDoListItem[];
}

export interface IUserToDo {
  id?: number;
  userId: number;
  list: IUserToDoList[];
}
