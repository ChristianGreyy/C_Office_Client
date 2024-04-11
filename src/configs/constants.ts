import { SideBarData } from '@interfaces'
import {
  PATH_CHAT_CHANNEL,
  PATH_HOME,
  PATH_LEVEL_MANAGEMENT,
  PATH_NOTIFICATION,
  PATH_POSITION_MANAGEMENT,
  PATH_PRIORITY_MANAGEMENT,
  PATH_STAFF_AND_ROLE_MANAGEMENT,
  PATH_STATUS_MANAGEMENT,
  PATH_TRACKER_MANAGEMENT,
  PATH_UNIVERSITY_MANAGEMENT,
  PATH_USER_MANAGEMENT
} from './../routes/navigation'
import {
  enumCashbackType,
  enumDashboardFilterTime,
  enumMemberType,
  enumNavKey,
  enumPageSize,
  enumRuleType,
} from './enum'

export const DEFAULT_LANGUAGE = process.env.REACT_APP_LANGUAGE || 'frn'
const ALL_THEMES = 'themes'
const CURRENT_THEME = 'theme'
export const COFFICE_ACCESS_TOKEN = 'coffice-access-token'

const SIDEBAR_WIDTH = '260px'
const SIDEBAR_COLLAPSED_WIDTH = '92px'
const SIDEBAR_ICON_SIZE = '24px'
const HEADER_HEIGHT = '65px'
const HEADER_PADDING_TOP = '20px'

const SIDEBAR_DATA: SideBarData[] = [
  {
    label: 'Dashboard',
    path: PATH_HOME,
    pathKey: enumNavKey.DASHBOARD,
  },
  // {
  //   label: 'Plan Management',
  //   path: PATH_PLAN,
  //   pathKey: enumNavKey.PLAN_MANAGEMENT,
  // },
  {
    label: 'User Management',
    path: PATH_USER_MANAGEMENT,
    pathKey: enumNavKey.USER_MANAGEMENT,
  },
  {
    label: 'Position Management',
    path: PATH_POSITION_MANAGEMENT,
    pathKey: enumNavKey.POSITION_MANAGEMENT,
  },
  {
    label: 'Level Management',
    path: PATH_LEVEL_MANAGEMENT,
    pathKey: enumNavKey.LEVEL_MANAGEMENT,
  },
  {
    label: 'University Management',
    path: PATH_UNIVERSITY_MANAGEMENT,
    pathKey: enumNavKey.UNIVERSITY_MANAGEMENT,
  },
  {
    label: 'Tracker Management',
    path: PATH_TRACKER_MANAGEMENT,
    pathKey: enumNavKey.TRACKER_MANAGEMENT,
  },
  {
    label: 'Status Management',
    path: PATH_STATUS_MANAGEMENT,
    pathKey: enumNavKey.STATUS_MANAGEMENT,
  },
  {
    label: 'Priority Management',
    path: PATH_PRIORITY_MANAGEMENT,
    pathKey: enumNavKey.PRIORITY_MANAGEMENT,
  },
  {
    label: 'Notification',
    path: PATH_NOTIFICATION,
    pathKey: enumNavKey.NOTIFICATION,
  },
  {
    label: 'Internal',
    path: PATH_STAFF_AND_ROLE_MANAGEMENT,
    pathKey: enumNavKey.CHAT_CHANNEL,
    subItems: [
      {
        label: 'Chat channel',
        path: PATH_CHAT_CHANNEL,
        pathKey: enumNavKey.CHAT_CHANNEL,
      },
      {
        label: 'Staff and role management',
        path: PATH_STAFF_AND_ROLE_MANAGEMENT,
        pathKey: enumNavKey.STAFF_AND_ROLE_MANAGEMENT,
      },
    ],
  },
]

const AUTH_THEME_COLOR = '#184f64'

const MAIN_THEME_DATA = {
  mainColor: '#184f64',
}

const MAT_SM_SCREEN_WIDTH = '1279px'
const MAT_SM_SCREEN_WIDTH_MIN = '1280px'

const RESET = 'RESET'

const CASHBACK_RULE_TYPE = [
  {
    value: enumRuleType.standard,
    label: 'Standard Cashback Rule',
  },
  {
    value: enumRuleType.superior,
    label: 'Superior Cashback Rule',
  },
]

const CASHBACK_TYPE = [
  {
    value: enumCashbackType.cost,
    label: '$',
  },
  {
    value: enumCashbackType.percent,
    label: '%',
  },
]

export const TOP_FILTER = [
  {
    value: 10,
    label: 'Top 10',
  },
  {
    value: 20,
    label: 'Top 20',
  },
  {
    value: 50,
    label: 'Top 50',
  },
]

const PAGE_SIZE_OPTIONS = [
  {
    value: enumPageSize.LIMIT_10,
    label: '10',
  },
  {
    value: enumPageSize.LIMIT_20,
    label: '20',
  },
  {
    value: enumPageSize.LIMIT_50,
    label: '50',
  },
]

const FILTER_MEMBER_TYPE = [
  {
    value: enumMemberType.ACTIVE,
    label: 'Active members',
  },
  {
    value: enumMemberType.NEW_MEMBER,
    label: 'New members',
  },
  {
    value: enumMemberType.ALL,
    label: 'All',
  },
]

const DASHBOARD_FILTER_TIME = [
  {
    value: enumDashboardFilterTime.ALL_DAYS,
    label: 'All days',
  },
  {
    value: enumDashboardFilterTime.TODAY,
    label: 'Today',
  },
  {
    value: enumDashboardFilterTime.YESTERDAY,
    label: 'Yesterday',
  },
  {
    value: enumDashboardFilterTime.LAST_7_DAYS,
    label: 'Last 7 days',
  },
  {
    value: enumDashboardFilterTime.LAST_14_DAYS,
    label: 'Last 14 days',
  },
  {
    value: enumDashboardFilterTime.LAST_21_DAYS,
    label: 'Last 21 days',
  },
  {
    value: enumDashboardFilterTime.LAST_28_DAYS,
    label: 'Last 28 days',
  },
  {
    value: enumDashboardFilterTime.LAST_60_DAYS,
    label: 'Last 60 days',
  },
  {
    value: enumDashboardFilterTime.CUSTOM,
    label: 'Custom date',
  },
]

const OPENING_TYPE = {
  ALL: 1,
  CUSTOM: 2,
}
const DAYS = {
  MON: 'monday',
  TUE: 'tuesday',
  WED: 'wednesday',
  THU: 'thursday',
  FRI: 'friday',
  SAT: 'saturday',
  SUN: 'sunday',
}
const DEFAULT_OPENING_HOUR = {
  [DAYS.MON]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.TUE]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.WED]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.THU]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.FRI]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: true,
  },
  [DAYS.SAT]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: false,
  },
  [DAYS.SUN]: {
    openHour: '00:00:00',
    closeHour: '23:59:59',
    timezone: 8,
    isOpen: false,
  },
}
export const DEFAULT_WELCOMED_BENEFITS_VALUE = {
  CASHBACK: 'cashback',
  POINTS: 'point',
  COUPONS: 'coupon',
  FREE_ITEMS: 'item',
}
const DEFAULT_WELCOMED_BENEFITS = [
  {
    value: DEFAULT_WELCOMED_BENEFITS_VALUE.CASHBACK,
    label: 'Cashback',
    disabled: false,
  },
  {
    value: DEFAULT_WELCOMED_BENEFITS_VALUE.POINTS,
    label: 'Points',
    disabled: false,
  },
  {
    value: DEFAULT_WELCOMED_BENEFITS_VALUE.COUPONS,
    label: 'Coupons',
    disabled: false,
  },
  {
    value: DEFAULT_WELCOMED_BENEFITS_VALUE.FREE_ITEMS,
    label: 'Free items',
    disabled: false,
  },
]
export const ruleDateFormat = 'DD-MM-YYYY'
export const ruleTimeFormat = 'HH:mm:ss'
export const dateOfBirthFormat = 'DD/MM/YYYY'
export const dateTimeFormat = 'HH:mm:ss DD-MM-YYYY'
export const dateFormat = 'DD-MM-YYYY'

export const RESEND_OTP_COUNTDOWN_TIME = 60 //seconds
export const MEMBER_LINK = 'https://minty-member-stage.adamo.tech/'
export const INITIAL_PAGE = 1
export const DEFAULT_ANNOUNCEMENT_TYPE = 'redirect'
export const DEFAULT_ANNOUNCEMENT_STATUS = true
export const MAXIMUM_IMAGE_SIZE = 1000000 //bytes - 1 MB
export const MAXIMUM_LIMIT = 1000000 //bytes - 1 MB

export const MAP_BOX_DEV_KEY =
  'pk.eyJ1IjoiYW5keWhpdSIsImEiOiJjbGNyOWl2ZDAwYmdjM3FucGMwbGhkbW90In0.ezl2EXwziuTkjZmYeh4Bcw'
export {
  ALL_THEMES, AUTH_THEME_COLOR, CASHBACK_RULE_TYPE, CASHBACK_TYPE, CURRENT_THEME, DASHBOARD_FILTER_TIME, DAYS, DEFAULT_OPENING_HOUR, DEFAULT_WELCOMED_BENEFITS, FILTER_MEMBER_TYPE, HEADER_HEIGHT, HEADER_PADDING_TOP, MAIN_THEME_DATA, MAT_SM_SCREEN_WIDTH,
  MAT_SM_SCREEN_WIDTH_MIN, OPENING_TYPE, PAGE_SIZE_OPTIONS, RESET, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_DATA, SIDEBAR_ICON_SIZE, SIDEBAR_WIDTH
}

export const INITIAL_PAGINATION_SiZE = 10

export enum StatusUser {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum StaticPageType {
  ABOUT_US = 'about-us',
  TERM_POLICY = 'term-policy',
}

export enum ClientStatusCode {
  OTP_TIMEOUT = 600,
  OTP_INVALID = 601,
  WRONG_OTP_CODE = 602,
  OVERTIME_SCAN_OTP = 603,
  AVAILABILITY_CREATE_SUCCESS = 604,
  AVAILABILITY_CREATE_ERROR = 605,
  AVAILABILITY_CREATE_EXISTED = 606,
  AVAILABILITY_UPDATE_SUCCESS = 607,
  AVAILABILITY_UPDATE_ERROR = 608,
  AVAILABILITY_DELETE_SUCCESS = 609,
  AVAILABILITY_DELETE_ERROR = 610,
  AVAILABILITY_GET_SUCCESS = 611,
  AVAILABILITY_GET_ERROR = 612,
  AVAILABILITY_GET_NOT_FOUND = 613,
  USER_NOT_FOUND = 614,
  EMAIL_ALREADY_EXISTS = 615,
  MOBILE_ALREADY_EXISTS = 616,
  SALESFORCE_CONTACT_ERR = 617,
  SALESFORCE_CONTACT_DUPLICATE = 618,
  USER_UPDATE_SUCCESS = 619,
  USER_NOT_ACTIVE = 620,
  INVALID_LOGIN_LINK = 621,
  ITEM_NOT_FOUND = 622,
  SEND_EMAIL_FAIL = 623,
}

export const USER_GENDER_OPTIONS = [
  {
    label: 'AAA',
    value: 'male',
  },
  {
    label: 'BBB',
    value: 'female',
  },
]

export const USER_STATUS_OPTIONS = [
  {
    label: 'XXXX',
    value: 'active',
  },
  {
    label: 'ZZZZZ',
    value: 'inactive',
  },
]

export enum EForgotPasswordPageType {
  VERIFY_EMAIL = 'verify-email',
  RESET_PASSWORD = 'reset-password',
  FORGOT_PASSWORD = 'forgot-password',
}

export enum EPlanType {
  MONTHLY = 1,
  YEARLY = 2,
}

export enum EPlanViewType {
  VIEW = 'view',
  ADD = 'add',
  EDIT = 'edit',
}

export enum EUserGender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum EKeyBoardCode {
  ENTER = 'Enter',
  SPACE = 'Space',
}

export enum EDeviceType {
  MOBILE_APP = 1,
  WATCH_APP = 2,
  BOTH = 3,
}

export const SICKNESS_OPTIONS = [
  'Heart Failure',
  'Myocardial Infarction',
  'Angina',
  'Aortic Dissection',
  'Valvular Disease',
  'Pulmonary Hypertension',
  'Arrhythmia',
  'Cardiomyopathy',
  'Other',
]

export enum EManageRoleTabs {
  STAFF_MANAGEMENT = 'Staff management',
  ROLE_MANAGEMENT = 'Role management',
}

export const DEFAULT_USER_AVATAR =
  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'

export const REGEX_EMAIL =
  /^[a-zA-Z0-9._%+-]+@(?!.*\.\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const ROLE_DEFAULT_ID = 2