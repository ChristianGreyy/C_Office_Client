import { enumThemeMode, MAIN_THEME_DATA } from '@/configs';
import { themes } from '@/theme';
import { Dropdown } from 'antd';
import styled from 'styled-components';

interface IDropdownProps {
  children?: JSX.Element | JSX.Element[] | string;
  dropdown: React.ReactElement;
  className?: string;
  overlayClassName?: string;
  open?: boolean;
  placement?: 'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight';
}

export const SharedDropdown = (props: IDropdownProps) => {
  const { children, dropdown, open, placement, className, overlayClassName } = props;
  return (
    <StyledDropdown
      overlay={dropdown}
      className={className}
      overlayClassName={overlayClassName}
      open={open}
      placement={placement}
      $appTheme={MAIN_THEME_DATA.mainColor}
    >
      {children}
    </StyledDropdown>
  );
};

const StyledDropdown = styled((props) => <Dropdown {...props} />)<{
  size?: string;
  $appTheme?: string;
}>`
  background: ${(p: any) =>
    p.theme_mode === enumThemeMode.DARK ? themes.theme.light.colors?.header?.background : p.$appTheme};
`;
