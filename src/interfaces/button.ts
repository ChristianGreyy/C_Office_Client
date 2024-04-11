import { MouseEvent, CSSProperties } from 'react';

export interface IButton {
  className?: string;
  disabled?: boolean;
  btnColor?: string;
  text?: string | JSX.Element | JSX.Element[];
  prevIcon?: JSX.Element | JSX.Element[];
  sufIcon?: JSX.Element | JSX.Element[];
  style?: CSSProperties;
  children?: JSX.Element | JSX.Element[] | string;
  typeHtml?: 'button' | 'submit' | 'reset' | undefined;
  destructive?: boolean;
  textClassName?: string;
  value?: number;
  display?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  textColor?: string;
  btnStyle?: 'basic' | 'rounded' | 'pad';
  onClick?: (action?: any) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
}
