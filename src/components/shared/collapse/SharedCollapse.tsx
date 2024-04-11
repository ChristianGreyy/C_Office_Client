import { memo, ReactNode, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Divider } from 'antd';
import { SharedButton } from '../button';
import { ChevronDownIcon } from '../../Icon';

interface IProps {
  className?: string;
  children?: string | JSX.Element | JSX.Element[];
  header?: string | JSX.Element | JSX.Element[];
  defaultOpen?: boolean;
  isDividerHeader?: boolean;
}

export const SharedCollapse = memo((props: IProps) => {
  const { className, children, header, defaultOpen = false, isDividerHeader } = props;

  const [showCollapse, setShowCollapse] = useState<boolean>(defaultOpen);

  return (
    <StyledCollapse className={className} $showCollapse={showCollapse}>
      <div className="coll-head">
        {isDividerHeader ? (
          <Divider orientation="left" orientationMargin={0} plain>
            <SharedButton
              onClick={() => setShowCollapse(!showCollapse)}
              className="filters-btn"
              prevIcon={
                <ChevronDownIcon
                  color="#ccc"
                  strokeWidth={2}
                  size={18}
                  className="filters-show__icon"
                />
              }
              text={header}
            />
          </Divider>
        ) : (
          <div onClick={() => setShowCollapse(!showCollapse)}>{header}</div>
        )}
      </div>
      <StyledCollapseContent $showCollapse={showCollapse}>{children}</StyledCollapseContent>
    </StyledCollapse>
  );
});

const StyledCollapse = styled.div<{
  disabled?: boolean;
  $showCollapse?: boolean;
}>`
  .coll-head {
    width: 100%;
  }
  .filters-btn {
    .text-btn {
      font-size: 1.42rem;
      font-weight: 400;
      color: ${(p) => (p?.$showCollapse ? p.theme?.colors?.button?.text : p.theme?.colors?.active)};
    }
    .filters-show__icon {
      transition: all 0.3s;
      transform: rotate(-90deg);
      ${(p) =>
        p.$showCollapse &&
        css`
          transform: rotate(0deg);
        }
      `}
    }
  }
`;

const StyledCollapseContent = styled.div<{
  $showCollapse?: boolean;
}>`
  width: 100%;
  position: relative;
  overflow: hidden;
  max-height: 0.01rem;
  max-height: ${(p) => (p.$showCollapse ? '999rem' : '0.1rem')};
  transition: max-height 0.3s;
`;
