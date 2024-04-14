import {
  IChangePasswordFields,
  ILoginFields,
  ILoginSuccessData,
  IResetPasswordFields,
  IVerifyEmailFields,
} from '@interfaces'
import { ApiClient } from './axiosClient'

const baseEndPoint = '/auth'

export const authAPI = {
  login: (values: ILoginFields) => {
    return ApiClient.post<ILoginSuccessData, ILoginFields>(
      `${baseEndPoint}/login`,
      values
    )
  },
  forgotPassword: (values: ILoginFields) => {
    return ApiClient.post<{}, ILoginFields>(
      `${baseEndPoint}/forgot-password`,
      values
    )
  },
  verifyPassword: (values: IVerifyEmailFields) => {
    return ApiClient.post<
      {
        isValid: boolean
      },
      IVerifyEmailFields
    >(`${baseEndPoint}/verify`, values)
  },
  resetPassword: (values: IResetPasswordFields) => {
    return ApiClient.post<{}, IResetPasswordFields>(
      `${baseEndPoint}/reset-password`,
      values
    )
  },
  changePassword: (values: IChangePasswordFields) => {
    return ApiClient.post<{}, IChangePasswordFields>(
      `${baseEndPoint}/change-password`,
      values
    )
  },
}
