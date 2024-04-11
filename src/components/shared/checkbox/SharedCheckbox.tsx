import { AUTH_THEME_COLOR } from '@/configs';
import { IHandleChange } from '@/interfaces';
import { LogApp } from '@/utils';
import { Checkbox, Radio } from 'antd';
// import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styled, { CSSProperties } from 'styled-components';

interface ICheckboxProps {
  // onChange?: () => void | any;
  onChange?: IHandleChange | any;
  style?: CSSProperties;
  className?: string;
  innerClassName?: string;
  size?: string;
  text?: string | React.ReactNode;
  supText?: string;
  checked?: boolean;
  value?: any;
  defaultChecked?: boolean;
  disabled?: boolean;
  type?: 'checkbox' | 'radio';
  indeterminate?: boolean;
  name?: string;
  id?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

export const SharedCheckbox = (props: ICheckboxProps) => {
  const {
    onChange,
    style,
    className,
    size = '2rem',
    text = '',
    defaultChecked,
    supText = '',
    disabled = false,
    type = 'checkbox',
    value,
    name,
    id,
    indeterminate,
    checked,
    innerClassName,
    textClassName,
    children,
  } = props;

  return (
    <StyledCheckbox size={size} style={style} className={className}>
      {type === 'checkbox' && (
        <Checkbox
          value={value}
          disabled={disabled}
          defaultChecked={defaultChecked}
          // onChange={(e: CheckboxChangeEvent) => {
          //   onChange && onChange(e.target.checked);
          // }}
          onChange={onChange}
          style={style}
          className={innerClassName}
          indeterminate={indeterminate}
          id={id}
          type={type}
          name={name}
          tabIndex={1}
          {...props}
          // checked={checked}
        >
          {!!text && (
            <span className={textClassName ? `checkbox-label ${textClassName}` : 'checkbox-label'}>
              {text}
            </span>
          )}
        </Checkbox>
      )}
      {type === 'radio' && (
        <>
          <Radio
            value={value}
            disabled={disabled}
            defaultChecked={defaultChecked}
            onChange={onChange}
            style={style}
            className={innerClassName}
            id={id}
            type={type}
            name={name}
            tabIndex={2}
            checked={checked}
          >
            {!!text && (
              <span className={textClassName ? `radio-label ${textClassName}` : 'radio-label'}>
                {text}
              </span>
            )}
          </Radio>
          {children}
        </>
      )}
      {!!supText && (
        <div className="right-switch">
          <span className="des">{supText}</span>
        </div>
      )}
    </StyledCheckbox>
  );
};

export const StyledCheckbox = styled.div<{
  size?: string;
  type?: 'checkbox' | 'radio';
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      gap: 0;
    }
  }
  .right-switch {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    margin-left: 1.6rem;
    .title {
      font-style: normal;
      font-weight: 500;
      color: gray;
      font-size: 1rem;
    }
    .des {
      font-style: normal;
      font-weight: 400;
      color: gray;
      font-size: 1rem;
    }
  }

  &:focus {
    box-shadow: 0px 0px 0px 1px #ffebeb;
  }

  .ant-checkbox-wrapper {
    animation-duration: 0s !important;
    /* display: flex; */
    align-items: center;
    .ant-checkbox {
      top: 0;
    }
  }

  .ant-radio-wrapper {
    margin-right: 0;
    display: flex;
    align-items: center;
    .ant-radio {
      top: 0;
    }
  }

  .ant-checkbox input {
    &:focus-within {
      border-color: ${AUTH_THEME_COLOR};
      box-shadow: 0px 0px 0px 1px #ffebeb;
    }
    &:focus {
      border-color: ${AUTH_THEME_COLOR};
      box-shadow: 0px 0px 0px 1px #ffebeb;
    }
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${AUTH_THEME_COLOR};
  }

  .ant-checkbox-inner {
    width: ${(p: any) => p.size};
    height: ${(p: any) => p.size};
    background: #ffffff;
    border: 1px solid #b6b6b6;
    border-radius: 0.4rem;
    &:focus {
      box-shadow: 0px 0px 0px 1px #ffebeb;
    }
  }

  .ant-checkbox-checked::after {
    border: none;
    border-radius: 0.4rem;
    animation: none;
    animation-fill-mode: none;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border: 1px solid ${AUTH_THEME_COLOR};
    border-radius: 0.4rem;
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    box-shadow: 0px 0px 0px 1px #ffebeb;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${AUTH_THEME_COLOR};
    border-color: ${AUTH_THEME_COLOR};
    border-radius: 0.4rem;
    &:hover {
      background: ${AUTH_THEME_COLOR};
      border: 1px solid ${AUTH_THEME_COLOR};
      border-radius: 0.4rem;
    }
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: 'fff';
    border-width: 2px;
    margin: 0 1px;
    /* transform: scale(1) translate(-50%, -50%); */
  }

  .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    height: 8px;
    background-color: 'red';
  }

  .ant-radio-inner {
    width: ${(p: any) => p.size};
    height: ${(p: any) => p.size};
    border-color: gray;
    background-color: transparent;
    &:focus {
      border-color: ${AUTH_THEME_COLOR};
      box-shadow: 0px 0px 0px 1px #ffebeb;
    }
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: ${AUTH_THEME_COLOR};
    background-color: #fff;
    &:after {
      transform: scale(0.6);
    }
  }

  .ant-radio-inner::after {
    background-color: ${AUTH_THEME_COLOR};
  }

  .ant-checkbox-disabled,
  .ant-radio-wrapper-disabled,
  .ant-radio-disabled,
  .ant-radio-disabled .ant-radio-input,
  .ant-radio-disabled .ant-radio-inner {
    cursor: default;
  }

  .ant-checkbox-wrapper.ant-checkbox-wrapper-disabled {
    cursor: default;
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: #855955;
  }
`;
