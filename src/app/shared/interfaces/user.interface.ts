export interface IMainUserInfo {
  uid?: string;
  email: string;
  name: string;
}

export interface IUser extends IMainUserInfo {
  sharedWithMe: { [uid: string]: IMainUserInfo }[];
  searchParameters: string[];
}
