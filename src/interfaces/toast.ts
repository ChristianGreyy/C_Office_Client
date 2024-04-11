export interface IToast {
  vertical?: 'top' | 'bottom';
  horizontal?: 'right' | 'left' | 'center';
  open?: boolean;
  autoHideDuration: number;
  type?: 'error' | 'warning' | 'info' | 'success';
  message: string;
}
