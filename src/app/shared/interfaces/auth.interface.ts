export interface ILogin {
  email: string;
  password: string;
}

export interface IRegistrations extends ILogin {
  name: string;
}
