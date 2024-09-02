
// Utility function to format error responses
export const formatError = (error) => {
    return {
      ...error,
      errorMessage: error.response?.data[0] ||
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    error.response?.data?.detail ||
                    error.message ||
                    'Sorry, An unexpected error occurred!'
    };
  };