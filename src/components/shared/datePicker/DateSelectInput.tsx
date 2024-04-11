import { memo, ReactNode, useCallback } from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import moment, { Moment } from 'moment';

import { LogApp } from '@utils';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { themes } from '@theme';

interface IPropsDatePicker {
  type?: 'week' | 'month' | 'quarter' | 'year';
  defaultValue?: any;
  format?: string;
  showTime?: boolean;
  showNow?: boolean;
  label?: string;
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  maxDate?: any;
  minDate?: any;
  disabled?: boolean;
  status?: 'error' | 'warning';
  popupClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
  allowClear?: boolean;
  bordered?: boolean;
  open?: boolean;
  nextIcon?: ReactNode;
  prevIcon?: ReactNode;
  superNextIcon?: ReactNode;
  superPrevIcon?: ReactNode;
  suffixIcon?: ReactNode;
  inputReadOnly?: boolean;
  placeholder?: string;
  required?: boolean;
  onChange?: (date: any | null, dateString: string) => void;
}

export const ShareDateSelect = memo((props: IPropsDatePicker) => {
  //page props
  const {
    type,
    label,
    errors,
    format = 'DD-MM-YYYY',
    showTime,
    maxDate,
    minDate,
    defaultValue,
    showNow,
    disabled,
    status,
    popupClassName,
    containerClassName,
    inputClassName,
    allowClear = true,
    bordered,
    open,
    nextIcon,
    prevIcon,
    superNextIcon,
    superPrevIcon,
    inputReadOnly = false,
    required,
    onChange,
  } = props;

  const disabledDate = useCallback((current: any) => {
    if (minDate && maxDate) {
      return (
        current &&
        (current.valueOf() <= minDate || current.valueOf() > moment(maxDate).add(1, 'day').toDate())
      );
    }
    if (minDate) {
      return current && current <= minDate;
    }
    if (maxDate) {
      return current && current > moment(maxDate).add(1, 'day').toDate();
    }
  }, []);

  return (
    <StyledSelectDateContainer className={containerClassName}>
      {label && (
        <label className="input__label" htmlFor={label}>
          {label}
          {required && <span className="required"> *</span>}:
        </label>
      )}
      <StyledDatePicker
        picker={type}
        disabledDate={disabledDate}
        onChange={onChange}
        format={format}
        showTime={showTime}
        defaultValue={defaultValue}
        showNow={showNow}
        disabled={disabled}
        status={status}
        popupClassName={popupClassName}
        allowClear={allowClear}
        bordered={bordered}
        open={open}
        className={inputClassName}
        nextIcon={nextIcon}
        prevIcon={prevIcon}
        superNextIcon={superNextIcon}
        superPrevIcon={superPrevIcon}
        inputReadOnly={inputReadOnly}
        {...props}
        // suffixIcon={suffixIcon}
      />
      {!!errors && <p className="input-text-error">{errors}</p>}
    </StyledSelectDateContainer>
  );
});

export const StyledSelectDateContainer = styled.div`
  .input__label {
    display: inline-block;
    margin-bottom: 0.8rem;
    color: inherit;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 20px;
    text-align: center;
    color: #303030;
    .required {
      color: #d42a1c;
      font-weight: bold;
    }
  }
  .input-text-error {
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: red;
    font-size: 1.2rem;
    position: relative;

    /* top: -0.2rem; */
    @media (max-width: 640px) {
      font-size: 1.1rem;
    }
  }
`;

const StyledDatePicker = styled((props) => <DatePicker {...props} />)<{
  //
}>`
  width: 100%;
  border: 1px solid ${(p) => themes.theme.light.colors.input?.border ?? '#b6b6b6'};
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
  border-radius: 0.6rem;
  color: #495057;
  input {
    font-size: 1.3rem;
  }
`;
