
export default interface DataState {
    data:null | {
        message:string
    },
    successMessage:boolean;
    loading: boolean;
    error: string | null;
  }