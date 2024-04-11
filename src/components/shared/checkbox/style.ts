import styled, { css } from 'styled-components';

export const StyleContainer = styled.div<{
  placeholderColor?: string;
  inputType?: string;
  sizeSearch?: string;
}>`
  width: 100%;
  label {
    display: inline-block;
    margin-bottom: 0.75rem;
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
  &&& {
    .group-input {
      height: 4rem;
      .input-text-error {
        margin-bottom: 0;
        color: red;
        font-size: 1.2rem;
        position: relative;
        top: -0.2rem;
      }
      ${(p) =>
        p.inputType === 'search' &&
        css`
          border-radius: 2rem;
          border: 1px solid #cecece;
          background-color: #fff;
          min-width: 20rem;
          position: relative;
        `}
      ${(p) =>
        p.sizeSearch === 'small' &&
        css`
          height: 3.2rem;
        `}
        .input-icon-search {
        height: 3.2rem;
        width: 3.2rem;
        background-color: #d42a1c;
        border-radius: 6rem 6rem 0 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 0.4rem;
        transform: translateY(-50%);
        ${(p) =>
          p.sizeSearch === 'small'
            ? css`
                background-color: transparent;
                width: auto;
                left: 1rem;
              `
            : css`
                cursor: pointer;
              `}
        img {
          width: 1.6rem;
          height: 1.6rem;
          ${(p) =>
            p.sizeSearch === 'small' &&
            css`
              width: 1.3rem;
              height: 1.3rem;
            `}
        }
      }
      .ant-input {
        height: 100%;
        padding: 0.6rem 1.2rem;
        border: 1px solid #b6b6b6;
        border-radius: 0.8rem;
        color: #495057;
        font-size: 1.4rem;
        ${(p) =>
          p.inputType === 'default' &&
          css`
            border-radius: 0.6rem;
          `}
        ${(p) =>
          p.inputType === 'search' &&
          css`
            border-radius: 2rem;
            border: none;
            padding-left: ${p.sizeSearch === 'small' ? '3.4rem' : '5.2rem'};
          `}
      }
      .ant-input:hover,
      .ant-input-focused,
      .ant-input:focus {
        ${(p) =>
          p.inputType === 'search' &&
          css`
            box-shadow: none;
          `}
      }
      .ant-input::placeholder {
        color: ${(p) => p.placeholderColor ?? '#6C757D'};
        font-style: normal;
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 20px;
        color: #6c757d;
      }
    }
  }
`;
