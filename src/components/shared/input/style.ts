import { MAIN_THEME_DATA } from '@/configs'
import { opacityHex, themes } from '@/theme'
import styled, { css } from 'styled-components'

export const StyleInputContainer = styled.div<{
  placeholderColor?: string
  inputType?: string
  sizeSearch?: string
  $inputDefaultStyle?: 'preTab' | 'postTab'
  $haveRightIcon?: boolean
}>`
  width: 100%;
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: inherit;
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 20px;
    text-align: center;
    color: #303030;
    .required {
      color: #d42a1c;
      font-weight: bold;
    }
  }
  /* &&& { */
  .inner-input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    overflow: hidden;
    &:focus,
    &:focus-within,
    &:focus-visible {
      outline: 4px solid ${MAIN_THEME_DATA.mainColor + opacityHex[20]};
    }
    height: 2.5rem;
    border: 1px solid
      ${(p) => themes.theme.light.colors.input?.border ?? '#b6b6b6'};
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    border-radius: 0.375rem;
    color: #495057;
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.25rem;
    ${(p) =>
      p.inputType === 'default' &&
      css`
        border-radius: 0.375rem;
      `}

    input {
      padding: 0.375rem 0.75rem;
      ${(p) =>
        p.$haveRightIcon &&
        css`
          padding-right: 2.125rem;
        `};
      height: 100%;
      width: 100%;
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
    }
    input:hover,
    input:focus {
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
      ${(p) =>
        p.inputType === 'search' &&
        css`
          box-shadow: none;
        `}
    }
    input::placeholder {
      color: ${(p) => p.placeholderColor ?? '#c2c2c2'};
    }

    &:where(.inner-input).r-input:focus {
      border-color: #4096ff;
      border-inline-end-width: 1px;
    }

    .prev-icon {
      margin-left: 0.5rem;
    }

    .suf-icon {
      position: absolute;
      right: 0.75rem;
    }

    .prefix {
      ${(p) =>
        p.$inputDefaultStyle === 'preTab' &&
        css`
          height: 100%;
          padding: 0 0.75rem;
          background: #f1f2f3;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
    }
  }

  .inner-input.disabled {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }

  .inner-input.textarea {
    align-items: flex-start;
  }

  &:where(.inner-input)input:hover {
    border-color: #4096ff;
    border-inline-end-width: 1px;
  }

  .input-text-error {
    margin-top: 0.375rem;
    margin-bottom: 0;
    color: red;
    font-size: 0.75rem;
    position: relative;

    @media (max-width: 640px) {
      font-size: 0.75rem;
    }
  }

  .ant-input:focus,
  .ant-input-focused {
    border-color: transparent;
  }

  .textarea {
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }

  .textarea:focus,
  .textarea:active,
  .textarea:focus-within,
  .textarea:focus-visible {
    outline: 4px solid #184f6433;
  }

  textarea {
    padding: 0.375rem 0.75rem;
    border: none;
  }

  textarea.ant-input[disabled] {
    color: #000;
    background-color: #fff;
    cursor: not-allowed;
  }

  .textarea-disabled:focus-within,
  .textarea-disabled:focus,
  .textarea-disabled:active,
  .textarea-disabled:focus-visible {
    outline: none;
  }
`
