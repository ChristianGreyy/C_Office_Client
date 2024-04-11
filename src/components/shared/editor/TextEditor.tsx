import styled, { css, CSSProperties } from 'styled-components';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { IHandleChange } from '@interfaces';
import { ICONS } from '@assets';

import { useEffect, useImperativeHandle, useState } from 'react';
import { LogApp } from '@utils';
import React from 'react';
import { convertToHTML } from 'draft-convert';

interface IProps {
  style?: CSSProperties;
  editorState?: any;
  breakpoint?: 'desktop' | 'mobile';
  className?: string;
  toolbarClassName?: string;
  wrapperClassName?: string;
  onChange?: IHandleChange;
  isTooltip?: boolean;
  arrow?: 'left' | 'center' | 'right';
  value?: EditorState;
}

export const ShareTextEditor = React.forwardRef((props: IProps, ref: any) => {
  //page props
  const {
    className,
    wrapperClassName,
    toolbarClassName,
    // editorState,
    breakpoint = 'mobile',
    isTooltip,
    arrow = 'left',
    value,
    // onChange,
  } = props;
  const [editor, setEditor] = useState(EditorState.createEmpty());
  // LogApp(convertToHTML(value?.getCurrentContent?.() as any), 'html')
  const onChange = (editorState: EditorState) => {
    LogApp(convertToHTML(editorState.getCurrentContent()), 'editorState');
    setEditor(editorState);
  };

  useImperativeHandle(ref, () => ({
    getCurrentContent: () => {
      return editor.getCurrentContent();
    },
  }));
  const uploadCallback = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // eslint-disable-line no-undef
      reader.onload = (e) => resolve({ data: { link: e?.target?.result } });
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    if (value) {
      LogApp('run');
      setEditor(value);
    }
  }, [value]);
  return (
    <StyledWysiwyg
      h1Icon={isTooltip ? ICONS.whiteH1Icon : ICONS.h1Icon}
      h2Icon={isTooltip ? ICONS.whiteH2Icon : ICONS.h2Icon}
      blockquoteIcon={isTooltip ? ICONS.whiteBlockquoteIcon : ICONS.blockquoteIcon}
      breakpoint={breakpoint}
      isTooltip={isTooltip}
      arrow={arrow}
    >
      <Editor
        editorState={editor}
        toolbarClassName={
          toolbarClassName ? `${toolbarClassName} wysiwyg-toolbar` : 'wysiwyg-toolbar'
        }
        wrapperClassName={
          wrapperClassName ? `${wrapperClassName} wysiwyg-wrapper` : 'wysiwyg-wrapper'
        }
        editorClassName={className ? `${className} wysiwyg-editor` : 'wysiwyg-editor'}
        onEditorStateChange={onChange}
        toolbar={{
          options: ['inline', 'fontSize', 'blockType', 'list', 'colorPicker', 'link'],
          inline: {
            inDropdown: false,
            className: 'inline-groups',
            options: ['bold', 'italic'],
            bold: {
              icon: isTooltip ? ICONS.whiteBoldIcon : ICONS.boldIcon,
              className: 'options-icon bold-icon',
            },
            italic: {
              icon: isTooltip ? ICONS.whiteItalicIcon : ICONS.italicIcon,
              className: 'options-icon italic-icon',
            },
          },
          blockType: {
            inDropdown: false,
            className: 'block-type-groups',
            options: ['H1', 'H2', 'Blockquote'],
          },
          list: {
            inDropdown: false,
            className: 'list-groups',
            dropdownClassName: undefined,
            options: ['unordered', 'ordered'],
            unordered: {
              icon: isTooltip ? ICONS.whiteListBulletIcon : ICONS.listBulletIcon,
              className: 'options-icon list-bullet-icon',
            },
            ordered: {
              icon: isTooltip ? ICONS.whiteListNumberIcon : ICONS.listNumberIcon,
              className: 'options-icon list-number-icon',
            },
          },
          link: {
            inDropdown: false,
            className: 'link-groups',
            popupClassName: undefined,
            dropdownClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_self',
            options: ['link'],
            link: {
              icon: isTooltip ? ICONS.whiteLinkIcon : ICONS.linkIcon,
              className: 'options-icon link-icon',
            },
            linkCallback: undefined,
          },
          // image: {
          //   className: 'options-icon image-groups',
          //   urlEnabled: true,
          //   uploadEnabled: true,
          //   alignmentEnabled: true,
          //   uploadCallback: uploadCallback,
          //   previewImage: true,
          //   inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          //   icon: isTooltip ? ICONS.whiteImageIcon : ICONS.imageIcon,
          //   alt: { present: false, mandatory: false },
          //   defaultSize: {
          //     height: 'auto',
          //     width: 'auto',
          //   },
          // },
        }}
      />
    </StyledWysiwyg>
  );
});

const StyledWysiwyg = styled.div<{
  h1Icon?: string;
  h2Icon?: string;
  blockquoteIcon?: string;
  breakpoint?: 'desktop' | 'mobile';
  isTooltip?: boolean;
  arrow?: 'left' | 'center' | 'right';
}>`
  .wysiwyg-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    padding: 0;
    ${(p) => {
      if (p.breakpoint === 'mobile') {
        return css`
          flex-direction: column;
          align-items: flex-start;
        `;
      } else {
        return css`
          flex-direction: row-reverse;
          align-items: center;
        `;
      }
    }}
    ${(p) =>
      p.isTooltip &&
      css`
        flex-direction: row;
        align-items: center;
        justify-content: center;
        /* background-color: #101828; */
        &::after {
          content: '';
          position: absolute;
          width: 0.75rem;
          height: 0.75rem;
          left: calc(
            ${(p: any) => {
                switch (p?.arrow) {
                  case 'left':
                    return '10%';
                  case 'center':
                    return '50%';
                  case 'right':
                    return '90%';
                }
              }} - 12px / 2
          );
          bottom: -0.313rem;
          background: #101828;
          border-radius: 1px;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        }
      `};
  }

  .wysiwyg-toolbar {
    width: ${(p) => (p.isTooltip ? 'fit-content' : '100%')};
    border: 1px solid #d0d5dd;
    /* border-radius: 0.5rem 0.5rem 0 0; */
    margin-bottom: 0;
    box-shadow: none !important;
    align-items: center;
    padding: 0.8rem 0.6rem 0.2rem;
    background-color: #f8f8f8;
    ${(p) =>
      p.isTooltip &&
      css`
        width: fit-content;
        background-color: #101828;
        border-radius: 0.5rem;
        padding: ${p.breakpoint === 'mobile' ? '0.375rem' : '0.5rem'};
        .image-groups {
          img {
            width: 1.75rem;
            height: 1.75rem;
          }
        }
      `};
  }

  .wysiwyg-editor {
    width: 100%;
    height: auto;
    background: #ffffff;
    padding: 0.625rem 0.875rem;
    border-left: 1px solid #d0d5dd;
    border-bottom: 1px solid #d0d5dd;
    border-right: 1px solid #d0d5dd;
    /* box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05); */
    color: #101828;
    /* border-radius: 0.5rem; */
    /* overflow: scroll; */
    min-height: 15rem;
    /* max-height: 50rem; */
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;
    ${(p) =>
      p.isTooltip &&
      css`
        display: none;
      `}
    ol > li {
      &::before {
        font-size: 1.5rem;
        left: -3rem;
      }
    }
    a {
      text-decoration: underline;
    }
  }

  .rdw-option-wrapper {
    border: none;
    box-shadow: none;
    &:hover {
      opacity: 0.6;
    }
  }

  .rdw-option-active {
    /* box-shadow: 1px 0px 1px 1px #e1e1e1 inset; */
    img {
      /* filter: invert(60%); */
    }
  }

  .inline-groups,
  .list-groups,
  .block-type-groups,
  .link-groups,
  .rdw-image-wrapper {
    margin-bottom: 0;
  }

  .rdw-inline-wrapper {
    margin-bottom: 6px;
    .rdw-option-active {
      opacity: 0.6;
    }
    &:last-child {
      margin-bottom: 6px;
    }
  }

  .rdw-option-wrapper {
    background-color: transparent;
  }

  .rdw-list-wrapper {
    margin-bottom: 6px;
  }

  .rdw-image-wrapper {
    margin-bottom: 6px;
  }

  .rdw-link-wrapper {
    margin-bottom: 6px;
  }

  .rdw-fontsize-dropdown {
    min-width: 5rem;
  }

  .rdw-fontfamily-dropdown {
    min-width: 14.1rem;
    /* width: auto; */
  }

  .rdw-dropdown-optionwrapper {
    overflow-y: auto;
  }

  .public-DraftStyleDefault-block {
    margin: 0;
  }

  .rdw-dropdown-selectedtext {
    span {
      color: #101828;
    }
  }

  .block-type-groups {
    .rdw-option-wrapper {
      display: block;
      /* width: 32px;
      height: 32px; */
      text-indent: -99999em;
      overflow: hidden;
      &:nth-child(1) {
        background: url(${(p) => p.h1Icon}) 0 0 no-repeat;
      }
      &:nth-child(2) {
        background: url(${(p) => p.h2Icon}) 0 0 no-repeat;
      }
      &:nth-child(3) {
        background: url(${(p) => p.blockquoteIcon}) 0 0 no-repeat;
      }
    }
  }
`;
