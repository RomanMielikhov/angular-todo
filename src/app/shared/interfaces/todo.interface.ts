export interface IToDoItem {
  id?: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export interface IToDoList {
  id?: string;
  title: string;
  position: number;
  orderOfItems: string[];
  createdAt: number;
  updatedAt: number;
}
