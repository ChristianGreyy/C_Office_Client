import { themes } from '@theme';
import styled from 'styled-components';

interface IProps {
  Icon: () => JSX.Element | JSX.Element[];
  content: string;
  isLast?: boolean;
  isFirst?: boolean;
  className?: string;
}

export const SharedInfoItem = (props: IProps) => {
  //page props
  const { Icon, content, isLast, isFirst, className } = props;

  return (
    <StyledInfoItem className={className}>
      <div className="iconBg">{Icon()}</div>
      <p className={isFirst ? 'isFirst' : isLast ? 'isLast' : ''}>{content}</p>
    </StyledInfoItem>
  );
};

const StyledInfoItem = styled.div`
  // background-color: red;
  --info-size: 105px;
  display: flex;
  align-items: center;
  p {
    margin-left: 30px;
  }
  .isFirst {
    margin-bottom: calc(var(--info-size) / 2 + 20px);
  }
  .isLast {
    margin-top: calc(var(--info-size) / 2 + 20px);
  }

  .iconBg {
    background-color: #${(p) => themes.theme.light.colors.header};
    min-width: var(--info-size);
    min-height: var(--info-size);
    border-radius: 100rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
