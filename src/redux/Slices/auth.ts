import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '.'
import {
  forgotPasswordAction,
  loginAction,
  resetPasswordAction,
  verifyPasswordAction,
} from '../actions/auth'
import { IUserDetail } from '@/interfaces'
import { getProfileAction, updateProfileAction } from '../actions/user-management'

interface IAuth {
  accessToken?: string
  accountInfo?: IUserDetail,
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
      state.accountInfo = action.payload?.data.user;
    })
    builder.addCase(loginAction.rejected, (state) => {
      state.loadings[`loginActionLoading`] = false
      state.accessToken = ''
    })
    builder.addCase(getProfileAction.pending, (state) => {
      state.loadings[`getProfileActionLoading`] = true
    })
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      console.log('action.payload', action.payload)
      state.loadings[`getProfileActionLoading`] = false
      state.accountInfo = action.payload;
    })
    builder.addCase(getProfileAction.rejected, (state) => {
      state.loadings[`getProfileActionLoading`] = false
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

    builder.addCase(updateProfileAction.pending, (state) => {
      state.loadings[`updateProfileActionLoading`] = true
    })
    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.loadings[`updateProfileActionLoading`] = false
      console.log('action.payload', action.payload)
      state.accountInfo = action.payload;
    })
    builder.addCase(updateProfileAction.rejected, (state) => {
      state.loadings[`updateProfileActionLoading`] = false
      state.accessToken = ''
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
