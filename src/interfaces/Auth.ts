export default interface register {
    username: string;
    email: string;
    password: string;
    phonenumber: string;
    confirm_password: string;
    isAdmin: boolean;
}


export interface LoginPayload {
    email: string;
    password: string;
  }