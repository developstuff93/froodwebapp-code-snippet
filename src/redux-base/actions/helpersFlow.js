// ------------------------Action constants---------------
export const CLEAR_SUCCESS = 'CLEAR_SUCCESS';
export const ERROR = 'ERROR';
export const REMOVE_WARNING_NOTIFICATION = 'REMOVE_WARNING_NOTIFICATION';
export const ADD_WARNING_NOTIFICATIONS = 'ADD_WARNING_NOTIFICATIONS';

// ------------------------Action creators---------------
export const failure = data => ({
  type: ERROR,
  data
});

export const removeWarningNotification = id => ({
  type: REMOVE_WARNING_NOTIFICATION,
  id
});

export const addWarningNotifications = notifications => ({
  type: ADD_WARNING_NOTIFICATIONS,
  notifications
});

export const clearSuccess = () => ({
  type: CLEAR_SUCCESS
});
