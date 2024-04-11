import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, SpinProps } from 'antd'

interface ILoadingProps extends SpinProps {}

export const Loading = (props: ILoadingProps) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  return <Spin {...props} indicator={antIcon} />
}
