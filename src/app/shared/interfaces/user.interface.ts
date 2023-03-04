export interface IMainUserInfo {
  id?: number;
  email: string;
  name: string;
  password: string;
}

export interface IUser extends IMainUserInfo {
  sharedWithMe: IMainUserInfo[];
  share: IMainUserInfo[];
}
