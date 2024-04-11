import { themes } from '@theme';
import { LogApp } from '@utils';
import { DatePicker } from 'antd';
import moment from 'moment';
import { ReactNode, useCallback, useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import styled from 'styled-components';
import { SharedButton } from '../button';
import { StyledSelectDateContainer } from './DateSelectInput';

interface IPropsDatePicker {
  type?: 'week' | 'month' | 'quarter' | 'year';
  format?: string;
  presets?: any;
  disabled?: [boolean, boolean];
  allowEmpty?: [boolean, boolean];
  showTime?: boolean;
  defaultValue?: any;
  separator?: ReactNode;
  suffixIcon?: ReactNode;
  showNow?: boolean;
  label?: string;
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  maxDate?: any;
  minDate?: any;
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
  inputReadOnly?: boolean;
  placeholder?: string | [string, string];
  required?: boolean;
  hiddenTimePanel?: boolean;
  onChange?: (date: [any, any] | null, dateString: [string, string]) => void;
}

const { RangePicker } = DatePicker;

export const ShareRangeDateSelect = (props: IPropsDatePicker) => {
  //page props
  const {
    type,
    format = 'DD-MM-YYYY',
    disabled,
    showTime = true,
    separator = <>&rarr;</>,
    defaultValue,
    inputReadOnly = false,
    suffixIcon,
    containerClassName,
    inputClassName,
    label,
    minDate,
    maxDate,
    required,
    errors,
    showNow,
    hiddenTimePanel = true,
    placeholder,
    onChange,
  } = props;

  const [pickerOpen, setPickerOpen] = useState<boolean>(false);

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
      <StyledRangeDatePicker
        allowEmpty
        onChange={onChange}
        format={format}
        picker={type}
        open={pickerOpen}
        disabled={disabled}
        className={inputClassName}
        // showTime={showTime}
        separator={separator}
        defaultValue={defaultValue}
        inputReadOnly={inputReadOnly}
        disabledDate={disabledDate}
        onClick={() => setPickerOpen(true)}
        onBlur={() => setPickerOpen(false)}
        popupClassName={hiddenTimePanel ? 'app-range-picker-hidden-time' : 'app-range-picker-popup'}
        onOk={(dates: [any, any]) => {
          if (dates[1]) {
            setPickerOpen(false);
          }
        }}
        showTime={{
          hideDisabledOptions: false,
          defaultValue: [moment('23:59:59', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')],
        }}
        placeholder={placeholder}
        // renderExtraFooter={() => (
        //   <SharedButton className="app-btn" onClick={() => setPickerOpen(false)} text={'OK'} />
        // )}
        // {...props}
        // suffixIcon={suffixIcon}
      />
      {!!errors && <p className="input-text-error">{errors}</p>}
    </StyledSelectDateContainer>
  );
};

const StyledRangeDatePicker = styled((props) => <RangePicker {...props} />)<{
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
