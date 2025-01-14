
export default interface DataState {
    data:null | Record<string,any>
    message:string | null
    successMessage:boolean;
    loading: boolean;
    accessToken?:string | undefined
    error: string | null;
  }