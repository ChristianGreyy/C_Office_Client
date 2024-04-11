import { ButtonProps, Button as AntButton } from 'antd'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface IButtonProps extends ButtonProps {
  icon?: ReactNode
}

export const Button = (props: IButtonProps) => {
  return (
    <StyledButton {...props} className={`Button ${props.className || ''}`}>
      {props.children}
    </StyledButton>
  )
}

const StyledButton = styled(AntButton)(({ icon, loading, theme }) => {
  return {
    display: icon || loading ? 'flex' : 'inline-block',
    alignItems: 'center',
    boxShadow: '1px 1px rgba(0,0,0,0.25)',
    width: 'fit-content',

    '&.ant-btn': {
      borderRadius: '6px',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: '500',
      padding: '0.5rem 0.75rem',
      height: 'fit-content',
      minWidth: '6rem',

      '&.ant-btn-sm': {
        padding: '0.6rem',
        fontSize: '0.75rem',
        lineHeight: '1rem',
      },
      '&.ant-btn-lg': {
        padding: '0.375rem 1rem',
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
      },

      '&.ant-btn-primary': {
        backgroundColor: theme?.colors?.primary,
        color: theme?.colors?.body,
        borderColor: theme?.colors?.primary,

        '&:focus:not(:disabled)': {
          opacity: '0.9',
          boxShadow: theme?.colors?.button?.shadowPrimary,
          color: theme?.colors?.body,
        },
        '&:hover:not(:disabled)': {
          opacity: '0.9',
          color: theme?.colors?.body,
        },
      },

      '&.ant-btn-ghost': {
        backgroundColor: '#EAEFF5',
        color: 'rgb(100,116,139)',
        borderColor: 'rgb(226,232,240)',
        boxShadow: 'none',
        '&:focus:not(:disabled)': {
          opacity: '0.',
        },
        '&:hover:not(:disabled)': {
          opacity: '0.8',
        },
      },

      '&.ant-btn-loading': {
        display: 'inline-flex',
      },
    },
  }
})
