
type Role= "user" | "admin" | "barber";



export default interface register {
    email: string;
    username: string;
    password: string;
    phonenumber: string;
    confirm_password: string;
    role: Role;
}


export interface LoginPayload {
    email: string;
    password: string;
  }
  


