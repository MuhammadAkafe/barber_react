

interface API_DATA{
  payload:{
  UserID:string, 
  isAdmin:boolean
  Phonenumber:string,
  UserName:string
  }
  message:string,
  access_token:string | null
}



export default interface DataState 
{
    data:null |API_DATA
    access_token?:string | null
    loading: boolean;
    error: string | null;
  }



  