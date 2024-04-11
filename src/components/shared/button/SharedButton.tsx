import { enumBtnStyle } from '@/configs';
import { IButton } from '@/interfaces';
import { debounce } from 'lodash';
import { useRef } from 'react';
import styled, { css } from 'styled-components';

export const SharedButton = (props: IButton) => {
  const {
    className,
    children,
    style,
    text = '',
    prevIcon,
    sufIcon,
    textClassName,
    value,
    typeHtml,
    disabled,
    backgroundColor,
    borderColor,
    borderWidth,
    btnStyle,
    textColor,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const submitBtn = useRef<HTMLButtonElement>(null);
  const debouncedOnPress = (action: any) => {
    onClick && onClick(action);
  };

  const onPressAction = debounce(debouncedOnPress, 300, {
    leading: true,
    trailing: false,
  });
  return (
    <StyledButton
      style={style}
      onClick={(action: any) => {
        if (!disabled) {
          onPressAction(action);
          submitBtn && submitBtn?.current?.click();
        }
      }}
      tabIndex={value}
      className={!className ? 'btn' : `btn ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      textColor={textColor}
      btnStyle={btnStyle}
    >
      {!!prevIcon && <div className="prev-icon">{prevIcon}</div>}
      {!!text && (
        <span
          className={!textClassName ? `text-btn` : `text-btn ${textClassName}`}
          tabIndex={value}
        >
          {text}
        </span>
      )}
      {!!sufIcon && <div className="suf-icon"> {sufIcon}</div>}
      {typeHtml === 'submit' && (
        <button ref={submitBtn} type={typeHtml} className="hidden-btn">
          Submit
        </button>
      )}
      {children}
    </StyledButton>
  );
};

export const StyledButton = styled.div<{
  disabled?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  textColor?: string;
  btnStyle?: 'basic' | 'rounded' | 'pad';
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  height: ${(p) => (p.btnStyle ? 'fit-content' : '100%')};
  border-radius: ${(p) => (p.btnStyle === enumBtnStyle.ROUNDED ? '200px' : '0.6rem')};
  &:hover {
    opacity: 0.85;
  }
  .hidden-btn {
    display: none;
  }
  .text-btn {
    display: inline-block;
    font-style: normal;
    font-weight: 500;
    font-size: 100%;
    font-family: 'Roboto';
    color: ${(p) => (p.btnStyle === enumBtnStyle.ROUNDED ? '#fff' : '#000')};
  }
  .prev-icon {
    margin-right: 0.8rem;
  }
  ${(p) =>
    p?.btnStyle &&
    css`
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 1.2rem 0;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 2px 3px;
      .text-btn {
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        color: #fff;
      }
    `}

  ${(p) =>
    p?.btnStyle === 'pad' &&
    css`
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 1.4rem 1.6rem;
      .text-btn {
        font-style: normal;
        font-weight: 500;
        font-size: 100%;
        line-height: 20px;
        text-align: center;
      }
      .prev-icon {
        position: absolute;
        left: 5%;
        margin-top: auto;
        margin-bottom: auto;
      }
      .suf-icon {
        position: absolute;
        right: 5%;
        margin-top: auto;
        margin-bottom: auto;
      }
    `}

  .text-btn {
    ${(p) => p.textColor && `color: ${p.textColor}`};
  }
  ${(p) =>
    p.borderColor &&
    `border: ${p?.borderWidth ? p?.borderWidth + 'px' : '2px'} solid ${p.borderColor}`};
  ${(p) => p.backgroundColor && `background: ${p.backgroundColor}`};
  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.3 !important;
    `};
`;
