export interface ReduxAction 
{
    type: string;
    payload?: {
      message?: string;
    };
    error?: {
      message?: string;
    };
  }
  
  interface ThunkMethod {
    fulfilled: {
      match: (action: ReduxAction) => boolean;
    };
    rejected: {
      match: (action: ReduxAction) => boolean;
    };
  }
  
  export const thunkErrorHandling = (
    action: ReduxAction,
    thunkMethod: ThunkMethod
  ): string => {
    if (thunkMethod.fulfilled.match(action)) {
      return action.payload?.message || "Appointment booked successfully!";
    }
    
    if (thunkMethod.rejected.match(action)) 
        {
      const errorMessage = action.payload?.message || action.error?.message;
      return errorMessage || "Failed to book appointment. Please try again.";
        }
    
    return "An unknown error occurred.";
  };