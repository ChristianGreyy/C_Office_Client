import styled, { css } from 'styled-components';
import { ChangeEvent, ReactNode } from 'react';

import { IMAGES } from '@assets';
import { LogApp } from '@utils';
import { PlusIcon, XCloseIcon } from '../../Icon';
import { SharedButton } from '../button';

interface IProps {
  uploadBtnRef: any;
  previewUrls?: string[];
  addImageUrl?: string;
  btnRemoveType?: 'hover' | 'visiable';
  iconRemove?: ReactNode;
  onUpload: () => void;
  onChangeImage: (e: ChangeEvent<any>) => void;
  onRemoveImage: (value: number) => void;
}

export const ShareUploadImageBtn = (props: IProps) => {
  const {
    uploadBtnRef,
    previewUrls,
    addImageUrl,
    btnRemoveType = 'hover',
    iconRemove,
    onUpload,
    onChangeImage,
    onRemoveImage,
  } = props;

  return (
    <StyledInfoItem className="upload__image" $btnRemoveType={btnRemoveType}>
      <div className="flex items-center">
        {previewUrls?.map((item: string, index: number) => {
          return (
            <div className="preview-images__item mr-2">
              <img
                onClick={onUpload}
                src={item || IMAGES.defaultImage}
                alt=""
                className="avatar"
                key={index}
              />
              <SharedButton onClick={() => onRemoveImage(index)} className="remove-btn">
                {iconRemove ? (
                  <>{iconRemove}</>
                ) : (
                  <XCloseIcon
                    size={12}
                    strokeWidth={btnRemoveType === 'hover' ? 2.5 : 3}
                    color={btnRemoveType === 'hover' ? '#222' : '#fff'}
                  />
                )}
              </SharedButton>
            </div>
          );
        })}

        {addImageUrl ? (
          <div onClick={onUpload} className="preview-images__item item-add">
            <img src={IMAGES.noImage} alt="" className="default-upload" />
          </div>
        ) : (
          <div onClick={onUpload} className="upload-box">
            <PlusIcon color="#f1f5f9" />
          </div>
        )}
      </div>

      <StyledUploadButton>
        <input
          ref={uploadBtnRef}
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          onChange={onChangeImage}
        />
      </StyledUploadButton>
    </StyledInfoItem>
  );
};

const StyledInfoItem = styled.div<{
  $btnRemoveType?: 'hover' | 'visiable';
}>`
  /* width: 12.8rem;
  height: 12.8rem; */
  overflow: hidden;
  position: relative;
  .preview-images__item {
    position: relative;
    width: 8rem;
    height: 8rem;
    .remove-btn {
      width: fit-content;
      height: fit-content;
      position: absolute;
      ${(p) =>
        p?.$btnRemoveType === 'hover'
          ? css`
              top: 2px;
              right: 2px;
              display: none;
              background-color: #fff;
              opacity: 0.82;
              border-radius: 50%;
              padding: 0.3rem;
              z-index: 3;
            `
          : css`
              top: 3px;
              right: 2px;
              display: block;
            `};
    }
    &:hover {
      .remove-btn {
        display: block;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    &:hover {
      opacity: 0.69;
    }
  }
  .upload-box {
    width: 8rem;
    height: 8rem;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    &:hover {
      opacity: 0.69;
    }
  }
`;

const StyledUploadButton = styled.div`
  display: none;
  input {
    display: none;
  }
`;
