import { IMainUserInfo } from './user.interface';

export interface IShare {
  user?: IMainUserInfo;
  read: boolean;
  write: boolean;
}
