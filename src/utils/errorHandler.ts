// src/utils/errorHandler.ts
export const handleApiError = (error: any, defaultMessage: string) => {
    if (error.response) {
      return error.response.data.message || defaultMessage;
    }
    return defaultMessage;
  };