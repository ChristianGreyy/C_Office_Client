import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { openToast } from 'src/redux';

export const useNotify = () => {
  //hook
  const dispatch = useDispatch();

  const errorMessage = useCallback((message: string, duration?: number) => {
    dispatch(
      openToast({
        message: message,
        type: 'error',
        autoHideDuration: duration || 2000,
      }),
    );
  }, []);

  const successMessage = useCallback((message: string, duration?: number) => {
    dispatch(
      openToast({
        message: message,
        type: 'success',
        autoHideDuration: duration || 2000,
      }),
    );
  }, []);
  const warningMessage = useCallback((message: string, duration?: number) => {
    dispatch(
      openToast({
        message: message,
        type: 'warning',
        autoHideDuration: duration || 2000,
      }),
    );
  }, []);
  return {
    error: errorMessage,
    success: successMessage,
    warning: warningMessage,
  };
};
