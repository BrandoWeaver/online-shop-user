declare namespace Login {
  export interface ILogin {
    status: string;
    token: string;
    user: User;
  }

  export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    usertype: string;
  }

  export interface IRegister {
    message: string;
    user: User;
  }

  export interface User {
    username: string;
    email: string;
    password: string;
    fullname: string;
    address: string;
    phoneNumber: string;
    userId: string;
  }
}
