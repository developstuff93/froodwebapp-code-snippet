import { logoutRequest } from 'redux-base/actions/loginFlow';

const parseError = (error, dispatch) => {

  switch (error.status) {
    case 504:
      return 'Request Timeout';
    case 500:
      return 'Internal Server Error';
    case 401: {
      dispatch(logoutRequest());
      return error.message || 'Unauthorized';
    }
    case 400:
      return error.message;
    default:
      return error.message;
  }
};

export default parseError;
