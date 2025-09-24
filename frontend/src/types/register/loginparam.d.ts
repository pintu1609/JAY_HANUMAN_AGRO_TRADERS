export interface LoginParams {
    email: string;
    password: string;
  }

export interface RegisterParams {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string; // include role
  }

 
  export interface UserType {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string; // include role
  }

  export interface UpdateUserType {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    role: string; // include role
  }

  export interface updateUserParams {
    name: string;
    email: string;
    phone: string;
    password?: string;
    role: string;
  }
 export interface UpdateRegisterUser {
    data:updateUserParams,
    id:string
    
  }