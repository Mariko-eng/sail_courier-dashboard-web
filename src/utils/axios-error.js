
// Utility function to format error responses
export const formatError = (error) => {
  let message = 'Sorry, an unexpected error occurred!';

  const data = error?.response?.data;

  if (Array.isArray(data)) {
    // If it's a list of error strings
    message = data[0];
  } else if (typeof data === 'object' && data !== null) {
    // Try common error message fields in order
    message =
      data.firebase ||
      data.error ||
      data.message ||
      data.detail ||
      message;
  } else if (typeof data === 'string') {
    // If it's a plain string error
    message = data;
  }

  return {
    ...error,
    message
  };
};



// export const formatError = (error) => {
//     return {
//       ...error,
//       message: error.response?.data[0] ||
//                     error.response?.data?.error ||
//                     error.response?.data?.message ||
//                     error.response?.data?.detail ||
//                     error.message ||
//                     'Sorry, An unexpected error occurred!'
//     };
//   };