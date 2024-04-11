import { MAIN_THEME_DATA } from '@/configs';
import { LogApp } from '@/utils';
import { Switch } from 'antd';
import { CSSProperties, useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';

interface IToggleProps {
  onChange?: (value: boolean) => void;
  style?: CSSProperties;
  className?: string;
  text?: string;
  supportingText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  activeColor?: string;
  name?: string;
  setValue?: UseFormSetValue<FieldValues>;
}

export const SharedToggle = (props: IToggleProps) => {
  const {
    onChange,
    style,
    className,
    text = '',
    supportingText = '',
    disabled,
    defaultChecked,
    checked,
    activeColor,
    name,
    setValue,
  } = props;
  const onChangeValue = (value: boolean) => {
    if (!setValue) {
      onChange?.(value);
    } else if (name) setValue?.(name, value);
  };
  return (
    <StyledToggle
      style={style}
      text={text}
      className={className}
      $activeColor={activeColor || MAIN_THEME_DATA.mainColor}
    >
      <Switch
        onChange={(checked) => {
          onChangeValue(checked);
        }}
        defaultChecked={defaultChecked}
        checked={checked}
        disabled={disabled}
      />
      {(!!text || !!supportingText) && (
        <div className="right-switch">
          {!!text && <span className="title">{text}</span>}
          {!!supportingText && <span className="des">{supportingText}</span>}
        </div>
      )}
    </StyledToggle>
  );
};

const StyledToggle = styled.div<{
  size?: 'sm' | 'md';
  text?: string;
  $activeColor?: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.625rem;
  .right-switch {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    .title {
      font-style: normal;
      font-weight: 500;
      /* line-height: 1.25rem; */
      color: #344054;
      font-size: 1.5rem;
    }
    .des {
      font-style: normal;
      font-weight: 400;
      color: #667085;
      font-size: 1rem;
    }
  }

  .ant-switch {
    background: #dadbdc;
    &:hover {
      background: #eaecf0;
    }
  }
  .ant-switch-checked {
    background: ${(p: any) => p.$activeColor};
    &:hover {
      background: ${(p: any) => p.$activeColor};
    }
  }
  /* .ant-switch-checked .ant-switch-handle {
    left: calc(100% - 1.5rem - 2px);
  } */
`;
