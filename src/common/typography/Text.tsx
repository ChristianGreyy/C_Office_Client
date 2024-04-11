import { Typography } from 'antd'
import { TextProps } from 'antd/lib/typography/Text'
import React from 'react'

import './index.style.css'

export const Text = (props: TextProps) => {
  return (
    <Typography.Text {...props} className="Typography_text">
      {props.children}
    </Typography.Text>
  )
}
