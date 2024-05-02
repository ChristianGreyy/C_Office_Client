import { Input as AntInput, DatePicker, InputProps, Select } from 'antd'
import { useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import styled from 'styled-components'

import moment from 'moment'
// import { ShareSelectInput } from '@/components/shared'

interface IInputProps extends InputProps {
  label?: string
  alignment?: 'row' | 'col'
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  name?: string
  containerClassName?: string
  haveShowPassIcon?: boolean
  required?: boolean
  onChangeDate?: (date: any) => void
  onChangeSelect?: (option: any) => void
  isDisableShadow?: boolean
  options?: {
    label: string
    value: number | string
    disabled?: boolean
  }[]
  selectMode?: string
  labelClassName?: string
  isViewMode?: boolean
}

const DEFAULT_INPUT_COLOR_STYLE = {
  // marginTop: 10,
  marginBottom: '-12px',
  padding: '5px',
  width: '50px',
  height: '50px',
}

export const Input = (props: IInputProps) => {
  const {
    label,
    size = 'middle',
    alignment = 'row',
    errors,
    className,
    name,
    containerClassName,
    haveShowPassIcon,
    type,
    required,
    prefix,
    value,
    onChangeDate,
    isDisableShadow,
    options,
    onChangeSelect,
    selectMode,
    labelClassName,
    isViewMode,
    ...passProps
  } = props
  const [isShowSecureText, setIsShowSecureText] = useState<boolean>(false)
  let inputContainerClass = 'grid grid-cols-7 gap-3'
  let labelClass = 'text-right mb-0 '


  switch (size) {
    case 'large':
      labelClass += 'text-base sm:w-40'
      break
    case 'middle':
      labelClass += 'text-sm sm:w-[14rem]'
      break
    case 'small':
      labelClass += 'text-xs sm:w-20'
      break
    default:
      labelClass += 'text-sm sm:w-32'
      break
  }

  return (
    <InputStyled className="w-full" $isDisableShadow={isDisableShadow}>
      <div
        className={`Input w-full ${inputContainerClass} ${
          containerClassName || ''
        }`}
      >
        {label && (
          <label
            htmlFor={name || label}
            className={`Input__label ${labelClass} ${labelClassName} inline-flex items-center  mr-[1.25rem]  text-dark col-span-2`}
          >
            {label}
            {required && (
              <span className="required text-[#B91C1C] font-bold"> *</span>
            )}
          </label>
        )}
        <div
          className={`Input__field-container w-full relative ${
            label ? 'col-span-5' : 'col-span-7'
          }`}
          style={{
            display: type === 'date' ? 'inline-grid' : 'block',
          }}
        >
          {type === 'date' ? (
            <DatePicker
              className="border-radius-0.5rem"
              onChange={(date, dateString) => {
                onChangeDate && onChangeDate(dateString.toString())
              }}
              value={value ? moment(value as string) : null}
              // picker="month"
              allowClear={false}
              style={{
                borderRadius: 5,
                height: 38,
                paddingTop: 8,
                marginTop: 10,
                borderColor: errors ? '#B91C1C' : '#D9D9D9',
              }}
            />
          ) : (
            <AntInput
              size={size}
              status={errors ? 'error' : undefined}
              name={name}
              {...passProps}
              disabled={passProps?.disabled || isViewMode}
              style={
                type === 'color'
                  ? {
                      ...DEFAULT_INPUT_COLOR_STYLE,
                      ...passProps.style,
                    }
                  : passProps.style
              }
              className={`Input__field ${className || ''} ${
                isViewMode ? 'ant-input-view' : ''
              }`}
              type={isShowSecureText ? 'text' : type}
              suffix={
                type === 'password' && haveShowPassIcon ? (
                  <div
                    className="suf-icon sh-pass"
                    onClick={() => {
                      setIsShowSecureText((prv) => !prv)
                    }}
                  >
                    {/* {!isShowSecureText ? (
                      <HideIcon size={20} />
                    ) : (
                      <ViewIcon size={20} />
                    )} */}
                  </div>
                ) : passProps.suffix ? (
                  passProps.suffix
                ) : undefined
              }
              value={value}
              prefix={prefix}
            />
          )}
        </div>
      </div>
      {/* {errors && (
        <div className="grid grid-cols-7 w-full ">
          {label && localAlignment === 'row' && (
            <div className={labelClass + ' col-span-2 min-w-[1px]'}></div>
          )}
          <div
            className={`Input__text-error mt-2 text-sm col-span-7 ${
              alignment === 'col' ? 'sm:col-span-7 text-left' : 'sm:col-span-5'
            }`}
          >
            {errors}
          </div>
        </div>
      )} */}
    </InputStyled>
  )
}

const InputStyled = styled('div')<{ $isDisableShadow?: boolean }>`
  .Input {
    .ant-select-disabled {
      & .ant-select-selector {
        background-color: white !important;
        & .ant-select-selection-item {
          color: black;
        }
      }
    }
    .Input__field-container {
      --tw-shadow: ${(props) =>
        props.$isDisableShadow ? 'none' : '0 1px 2px 0 rgb(0 0 0 / 0.05)'};
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }
    .ant-input {
      border-radius: 0.375rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      background-color: #fff;
      border-width: 1px;
      padding: 0.5rem 0.75rem;
      appearance: none;
      --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

      &.ant-input-view {
        color: black;
      }

      &.ant-input-lg {
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 1.125rem;
        line-height: 1.75rem;
      }

      &.ant-input-sm {
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-size: 0.75rem;
        line-height: 1rem;
      }

      &.ant-input-status-error,
      &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless) {
        --tw-border-opacity: 1;
        border-color: rgb(var(--color-danger) / var(--tw-border-opacity));
      }

      &:focus {
        border-color: rgb(var(--color-primary) / var(--tw-border-opacity));
        --tw-border-opacity: 0.4;
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
          var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
          calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000);
        --tw-ring-color: rgb(var(--color-primary) / var(--tw-ring-opacity));
        --tw-ring-opacity: 0.2;
      }
    }

    .ant-input-affix-wrapper {
      padding: 0 12px 0 0;
      border-radius: 0.375rem;
      border-color: rgb(var(--color-slate-200) / var(--tw-border-opacity));
      --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
        var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

      .ant-input {
        border-radius: 0.375rem;
        border-color: rgb(var(--color-slate-200) / var(--tw-border-opacity));
        font-size: 0.875rem;
        line-height: 1.25rem;
        --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
          var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        background-color: #fff;
        border-width: 1px;
        padding: 0.5rem 0.75rem;
        appearance: none;

        &.ant-input-lg {
          padding-top: 0.375rem;
          padding-bottom: 0.375rem;
          padding-left: 1rem;
          padding-right: 1rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
        }

        &.ant-input-sm {
          padding-top: 0.375rem;
          padding-bottom: 0.375rem;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          font-size: 0.75rem;
          line-height: 1rem;
        }

        &:focus {
          border-color: rgb(var(--color-primary) / var(--tw-border-opacity));
          --tw-border-opacity: 0.4;
          --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
            var(--tw-ring-offset-width) var(--tw-ring-offset-color);
          --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
            calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);
          box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
            var(--tw-shadow, 0 0 #0000);
          --tw-ring-color: rgb(var(--color-primary) / var(--tw-ring-opacity));
          --tw-ring-opacity: 0.2;
        }
      }
      &.ant-input-affix-wrapper-focused,
      &:focus {
        border-color: rgb(var(--color-primary) / var(--tw-border-opacity));
        --tw-border-opacity: 0.4;
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
          var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
          calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000);
        --tw-ring-color: rgb(var(--color-primary) / var(--tw-ring-opacity));
        --tw-ring-opacity: 0.2;
      }

      &.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
      &.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
        --tw-border-opacity: 1;
        border-color: rgb(var(--color-danger) / var(--tw-border-opacity));
      }

      &.ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper-focused {
        box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
        border-right-width: 1px;
        outline: 0;
      }
    }

    .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
      border-color: rgb(var(--color-slate-200) / var(--tw-border-opacity));
    }
  }

  .Input__text-error {
    --tw-text-opacity: 1;
    color: rgb(var(--color-danger) / var(--tw-text-opacity));
  }
`
