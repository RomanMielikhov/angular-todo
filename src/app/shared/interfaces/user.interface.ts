export interface IPermissions {
  uid: string;
  read: boolean;
  write: boolean;
  edit: boolean;
}

export interface IUser {
  uid?: string;
  email: string;
  name: string;
  sharedWith: Array<IPermissions>;
}
