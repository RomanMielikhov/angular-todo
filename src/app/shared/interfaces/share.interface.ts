import { IUser } from './user.interface';

export interface IShare {
  user?: IUser;
  read: boolean;
  write: boolean;
  share: boolean;
}
