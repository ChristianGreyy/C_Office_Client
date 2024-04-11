import { ReactNode } from 'react';
import { TimePicker } from 'antd';
import styled from 'styled-components';

interface IPropsDatePicker {
  suffixIcon?: ReactNode;
  use12Hours?: boolean;
  value?: any;
  disabled?: boolean;
  inputReadOnly?: boolean;
  bordered?: boolean;
  status?: 'error' | 'warning';
  secondStep?: number;
  hourStep?: number;
  minuteStep?: number;
  showNow?: boolean;
  defaultValue?: any;
  placeholder?: string;
  format?: string;
  onChange?: (time: any | null, timeString: string) => void;
  className?: string;
  popupClassName?: string;
}

export const ShareTimeSelect = (props: IPropsDatePicker) => {
  //page props
  const {
    onChange,
    format = 'HH:mm:ss',
    suffixIcon,
    use12Hours,
    value,
    disabled,
    inputReadOnly = false,
    bordered,
    status,
    secondStep,
    hourStep,
    minuteStep,
    showNow = true,
    placeholder,
    defaultValue,
    className,
    popupClassName,
  } = props;
  return (
    <StyledDatePicker
      // suffixIcon={suffixIcon}
      className={className}
      onChange={onChange}
      format={format}
      value={value}
      use12Hours={use12Hours}
      disabled={disabled}
      inputReadOnly={inputReadOnly}
      bordered={bordered}
      status={status}
      secondStep={secondStep}
      hourStep={hourStep}
      minuteStep={minuteStep}
      showNow={showNow}
      defaultValue={defaultValue}
      placeholder={placeholder}
      popupClassName={popupClassName}
    />
  );
};

const StyledDatePicker = styled((props) => <TimePicker {...props} />)<{
  //
}>`
  width: 100%;
  border-radius: 0.5rem;
`;
