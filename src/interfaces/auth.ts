export interface ILoginSuccessData {
  accessToken: string,
  data: {
    email: string
  }
}

export interface ILoginFields {
  email?: string
  password?: string
}

export interface IRegisterFields {
  email: string
  password: string
  name: string
  phone: string
  theme_color?: string
}

export interface ISendMailForgotFields {
  email: string
  hash: string
}

export interface IVerifyEmailFields {
  code: string
  email: string
}

export interface IResetPasswordFields extends IVerifyEmailFields {
  newPassword: string
}
export interface IChangePasswordFields {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ILogoutFields {
  accessToken?: string
}

export interface ILoginResFields {
  accessToken?: string
  merchantInfo?: IMerchantInfo
}
export interface ColorTheme {
  color: string
  font_size: number
  logo: string
}
export interface IMerchantInfo {
  theme_color?: ColorTheme
  createdAt: string
  email: string
  id: number
  name: string
  phone: string
  work_phone: string
  work_email: string
  full_name: string
  privacy_policy: string
  receive_noti: boolean
  updatedAt: string
  brand_name: string
  business_type: string
  cashback_birthday_percent: number
  coupon_birthday: string
  people_amount: number
  point_birthday_percent: number
  allow_send_sms: boolean
  url: string
}
