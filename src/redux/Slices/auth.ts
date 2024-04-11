import { createSlice } from '@reduxjs/toolkit'

import { IMerchantInfo } from '@interfaces'
import { RootState } from '.'
import {
  forgotPasswordAction,
  loginAction,
  resetPasswordAction,
  verifyPasswordAction,
} from '../actions/auth'

interface IAuth {
  accessToken?: string
  accountInfo?: IMerchantInfo
  forgotEmail?: string
  code?: string
  loadings: Record<string, boolean | undefined>
}

const initialState: IAuth = {
  accessToken: '',
  accountInfo: undefined,
  forgotEmail: undefined,
  code: undefined,
  loadings: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload?.access_token
    },
    logout: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loadings[`loginActionLoading`] = true
    })
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loadings[`loginActionLoading`] = false
      state.accessToken = action.payload?.data.accessToken
    })
    builder.addCase(loginAction.rejected, (state) => {
      state.loadings[`loginActionLoading`] = false
      state.accessToken = ''
    })
    builder.addCase(forgotPasswordAction.pending, (state) => {
      state.loadings[`forgotPasswordActionLoading`] = true
    })
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.loadings[`forgotPasswordActionLoading`] = false
      state.forgotEmail = action.payload?.data.email
    })
    builder.addCase(forgotPasswordAction.rejected, (state) => {
      state.loadings[`forgotPasswordActionLoading`] = false
    })

    builder.addCase(verifyPasswordAction.pending, (state) => {
      state.loadings[`verifyPasswordActionLoading`] = true
    })
    builder.addCase(verifyPasswordAction.fulfilled, (state, action) => {
      state.loadings[`verifyPasswordActionLoading`] = false
      state.forgotEmail = action.payload?.data.email
      state.code = action.payload?.data.code
    })
    builder.addCase(verifyPasswordAction.rejected, (state) => {
      state.loadings[`verifyPasswordActionLoading`] = false
    })

    builder.addCase(resetPasswordAction.pending, (state) => {
      state.loadings[`resetPasswordActionLoading`] = true
    })
    builder.addCase(resetPasswordAction.fulfilled, (state) => {
      state.loadings[`resetPasswordActionLoading`] = false
      state.forgotEmail = undefined
      state.code = undefined
    })
    builder.addCase(resetPasswordAction.rejected, (state) => {
      state.loadings[`resetPasswordActionLoading`] = false
    })
  },
})

export const authActions = {
  ...authSlice.actions,
}

export const selectAuth = (state: RootState) => state.auth
export const selectAuthLoading = (state: RootState, name: string) =>
  state.auth.loadings[`${name}Loading`]

export default authSlice.reducer
