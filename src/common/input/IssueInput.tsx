import { Input as AntInput, DatePicker, InputProps, Select } from "antd";
import { useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import styled from "styled-components";

import moment from "moment";
// import { ShareSelectInput } from '@/components/shared'

interface IInputProps extends InputProps {
  label?: string;
  alignment?: "row" | "col";
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  name?: string;
  containerClassName?: string;
  haveShowPassIcon?: boolean;
  required?: boolean;
  onChangeDate?: (date: any) => void;
  onChangeSelect?: (option: any) => void;
  isDisableShadow?: boolean;
  options?: {
    label: string;
    value: number | string;
    disabled?: boolean;
  }[];
  selectMode?: string;
  labelClassName?: string;
  isViewMode?: boolean;
}

const DEFAULT_INPUT_COLOR_STYLE = {
  // marginTop: 10,
  marginBottom: "-12px",
  padding: "5px",
  width: "50px",
  height: "50px",
};

export const IssueInput = (props: IInputProps) => {
  const {
    label,
    size = "large",
    alignment = "row",
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
  } = props;
  const [isShowSecureText, setIsShowSecureText] = useState<boolean>(false);
  let inputContainerClass = "grid grid-cols-12 gap-3";
  let labelClass = "text-right mb-0 ";

  switch (size) {
    case "large":
      labelClass += "text-base sm:w-40";
      break;
    case "middle":
      labelClass += "text-sm sm:w-[14rem]";
      break;
    case "small":
      labelClass += "text-xs sm:w-20";
      break;
    default:
      labelClass += "text-sm sm:w-32";
      break;
  }

  return (
    <InputStyled className="w-full" $isDisableShadow={isDisableShadow}>
      <div
        className={`Input w-full ${inputContainerClass} ${
          containerClassName || ""
        }`}
      >
        {label && (
          <label
            htmlFor={name || label}
            className={`Input__label ${labelClass} ${labelClassName} inline-flex items-center  text-dark col-span-1`}
          >
            {label}
            {required && (
              <span className="required text-[#B91C1C] font-bold"> *</span>
            )}
          </label>
        )}
        <div
          className={`Input__field-container w-full relative`}
          style={{
            display: type === "date" ? "inline-grid" : "block",
          }}
        >
          {type === "date" ? (
            <DatePicker
              className="border-radius-0.5rem"
              onChange={(date, dateString) => {
                onChangeDate && onChangeDate(dateString.toString());
              }}
              value={value ? moment(value as string) : null}
              // picker="month"
              allowClear={false}
              style={{
                borderRadius: 5,
                height: 38,
                paddingTop: 8,
                marginTop: 10,
                borderColor: errors ? "#B91C1C" : "#D9D9D9",
              }}
            />
          ) : (
            <AntInput
              size={size}
              status={errors ? "error" : undefined}
              name={name}
              {...passProps}
              disabled={passProps?.disabled || isViewMode}
              style={
                type === "color"
                  ? {
                      ...DEFAULT_INPUT_COLOR_STYLE,
                      ...passProps.style,
                    }
                  : passProps.style
              }
              className={`Input__field ${className || ""} ${
                isViewMode ? "ant-input-view" : ""
              }`}
              type={isShowSecureText ? "text" : type}
              suffix={
                type === "password" && haveShowPassIcon ? (
                  <div
                    className="suf-icon sh-pass"
                    onClick={() => {
                      setIsShowSecureText((prv) => !prv);
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
  );
};

const InputStyled = styled("div")<{ $isDisableShadow?: boolean }>`
  .Input__field-container {
    grid-column: 2 / span 11;
  }
`;
