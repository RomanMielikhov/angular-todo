export interface IMainUserInfo {
  id?: string;
  email: string;
  name: string;
  password: string;
}

export interface IUser extends IMainUserInfo {
  sharedWithMe: { [uid: string]: IMainUserInfo }[];
  searchParameters: string[];
}
