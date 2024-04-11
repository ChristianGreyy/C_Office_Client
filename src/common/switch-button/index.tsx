import { Switch, SwitchProps } from 'antd'
import styled from 'styled-components'

import { themes } from '@/theme'

export const SwitchButton = styled((props: SwitchProps) => {
  return <Switch {...props} />
})`
  &.ant-switch-checked {
    background-color: ${themes.theme.light.colors.primary};
  }
`
