import { EPlanViewType, enumNavKey } from '@/configs'
import { AxiosError } from 'axios'

export interface IGetParams {
  page?: string | number
  size?: string | number
}
export interface BaseResponseProps<TData = any> {
  statusCode: number
  data: TData
  errors?: any
  messages?: string
  message?: string
  success: boolean
  total?: number
}

export interface BaseResponseError extends AxiosError {
  errors: string | string[]
  success: boolean
}

export interface IGetRoot {
  success: boolean
  code: number
  message: string
}

export interface IGetListParams {
  num?: number
  limit?: number
  page: number
  title?: string
}
export type DropdownProps = Array<{ value: string | number; label: string }>
export interface FilterDataItem {
  value: string | number
  label: string
}

export interface SideBarData {
  label: string
  path: string
  pathKey: enumNavKey
  subItems?: SubSideBar[]
}

export interface SubSideBar {
  label: string
  path: string
  pathKey: enumNavKey
  subOptions?: any[]
}

export type RouterParams = {
  planDetail: {
    type: EPlanViewType
  }
  UserDetailPage: {
    userId: string
  },
  PositionDetailPage: {
    positionId: string
  },
  LevelDetailPage: {
    levelId: string
  },
  UniversityDetailPage: {
    universityId: string
  }
  TrackerDetailPage: {
    trackerId: string
  },
  StatusDetailPage: {
    statusId: string
  },
  PriorityDetailPage: {
    priorityId: string
  },
  UserHealthDetail: {
    userId: string
  }
  NotificationEditPage: {
    notificationId: string
  }
}
