import { Skeleton, Image } from 'antd';
import { memo, useState } from 'react';
import styled, { css } from 'styled-components';

interface IProps {
  src: string;
  className?: string;
  alt?: string;
  noImageLoadingIcon?: boolean;
  onClick?: any;
  canPreview?: boolean;
}

export const SharedImage = memo((props: IProps) => {
  const { src, className, alt, noImageLoadingIcon = true, canPreview, onClick } = props;

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <StyledImage>
      {canPreview ? (
        <Image
          onClick={onClick}
          alt={alt}
          className={`smooth-image ${imageLoaded ? 'dh-image' : 'image-hidden'} ${className}`}
          src={src}
          onLoad={() => setImageLoaded(true)}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            // currentTarget.src = 'https://errorImg.jpg';
          }}
        />
      ) : (
        <img
          onClick={onClick}
          alt={alt}
          className={`smooth-image ${imageLoaded ? 'dh-image' : 'image-hidden'} ${className}`}
          src={src}
          onLoad={() => setImageLoaded(true)}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            // currentTarget.src = 'https://errorImg.jpg';
          }}
        />
      )}

      {!imageLoaded && (
        <StyledPreLoader className="smooth-preloader" noImageLoadingIcon={noImageLoadingIcon}>
          <Skeleton.Image active />
        </StyledPreLoader>
      )}
    </StyledImage>
  );
});

const StyledImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  .error-load {
    width: 100%;
    height: 100%;
  }
  .smooth-image {
    transition: opacity 1s;
  }
  .dh-image {
    opacity: 1;
  }
  .image-hidden {
    opacity: 0;
  }
`;

const StyledPreLoader = styled.div<{ noImageLoadingIcon?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-skeleton-element {
    width: 100%;
    height: 100%;
    .ant-skeleton-image {
      width: 100%;
      height: 100%;
    }
    .ant-skeleton-image-svg {
      ${(p) =>
        p.noImageLoadingIcon &&
        css`
          visibility: hidden;
        `};
      width: 45%;
      height: 45%;
    }
  }
`;
