// src/utils/errorHandler.ts
export const handleApiError = (error: any, defaultMessage: string) => {
  if (!error) return defaultMessage;
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return defaultMessage;
};