import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IToast } from '@/interfaces';
import { RootState } from '.';

interface IInitialState {
  toast: IToast;
}

const initialState: IInitialState = {
  toast: {
    autoHideDuration: 5000,
    vertical: 'top',
    horizontal: 'right',
    open: false,
    type: 'success',
    message: '',
  },
};

const toast = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, action: PayloadAction<IToast>) => {
      const { vertical, horizontal, open, autoHideDuration, type, message } = action.payload;
      const newState: IToast = {
        vertical: vertical ? vertical : 'top',
        horizontal: horizontal ? horizontal : 'right',
        open: open ? open : true,
        autoHideDuration,
        type: type ? type : 'success',
        message,
      };
      state.toast = newState;
    },
    closeToast: (state) => {
      state.toast.open = false;
    },
  },
});

export const selectToast = (state: RootState) => state.toast;

export const { openToast, closeToast } = toast.actions;

export default toast.reducer;
