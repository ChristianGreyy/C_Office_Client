import { IMAGES } from '@assets';
import { themes } from '@theme';
import { sliceImageName } from '@utils';
import { Image } from 'antd';
import { ChangeEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

import { UploadIcon } from '../../Icon';
import { SharedButton } from '../button';

interface IProps {
  typeUpload?: 'button' | 'image' | 'change';
  uploadBtnRef: any;
  previewUrl?: string;
  defaultUrl?: string;
  previewImageStyle?: 'contain' | 'cover';
  onUpload: () => void;
  onChangeImage: (e: ChangeEvent<any>) => void;
  selectedImage?: any;
  error?: string;
}

export const ShareUploadImage = (props: IProps) => {
  const {
    typeUpload,
    uploadBtnRef,
    previewUrl,
    defaultUrl,
    selectedImage,
    error,
    previewImageStyle,
    onUpload,
    onChangeImage,
  } = props;

  return typeUpload === 'button' ? (
    <StyledUploadImage $previewImageStyle={previewImageStyle}>
      <div className="contain-upload">
        <SharedButton
          prevIcon={<UploadIcon size={16} />}
          onClick={onUpload}
          className="upload-btn"
          text="Choose image"
          btnStyle="basic"
        />
        <div>
          <p className="upload-img__name">{sliceImageName(selectedImage?.name)}</p>
        </div>
      </div>
      {!!previewUrl && (
        <div className="upload-image__contain">
          <img src={previewUrl} alt="" className="avatar" />
        </div>
      )}
      {error && <p className="mt-3 upload-img__error">{error}</p>}
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
    </StyledUploadImage>
  ) : (
    <StyledInfoItem className="upload__image" $previewImageStyle={previewImageStyle}>
      {typeUpload === 'change' ? (
        <>
          <Image src={previewUrl || defaultUrl || IMAGES.noImage} alt="" className="avatar" />
          {/* {error && <p className="mt-3 upload-img__error">{error}</p>} */}
          <SharedButton
            onClick={onUpload}
            className="upload-btn"
            text="Change image"
            btnStyle="basic"
          />
        </>
      ) : (
        <img
          onClick={onUpload}
          src={previewUrl || defaultUrl || IMAGES.noImage}
          alt=""
          className="avatar"
        />
      )}

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

const StyledUploadImage = styled.div<{
  $previewImageStyle?: 'contain' | 'cover';
}>`
  .contain-upload {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;
    .upload-img__name {
      margin-bottom: 0;
    }

    .upload-btn {
      width: fit-content;
      padding: 0.6rem 1.2rem;
      background-color: ${(p) => themes.theme.light.colors.primary};
      margin-right: 0.9rem;
      .text-btn {
        font-size: 1.2rem;
      }
    }
  }

  .upload-image__contain {
    width: 15.8rem;
    height: 15.8rem;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:hover {
      img {
        opacity: 0.7;
      }
    }
  }

  .upload-img__error {
    color: ${(p: any) => themes.theme.light.colors?.error};
    margin-bottom: 0;
  }
`;

const StyledUploadButton = styled.div`
  display: none;
  input {
    display: none;
  }
`;

const StyledInfoItem = styled.div<{
  $previewImageStyle?: 'contain' | 'cover';
}>`
  width: 12.8rem;
  height: 12.8rem;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: ${(p) => p?.$previewImageStyle ?? 'cover'};
    border-radius: 5px;
  }
  .upload-btn {
    margin-top: 1.2rem;
    width: 100%;
    padding: 1rem 1.2rem;
    background-color: ${(p) => themes.theme.light.colors.primary};
    margin-right: 0.9rem;
    .text-btn {
      font-size: 1.2rem;
    }
  }
  &:hover {
    img {
      opacity: 0.7;
    }
  }
`;
