import {
  IFetchStatusesParams,
  IFetchStatusesSuccessData,
  IStatusDetail,
  TUpdateStatusData,
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const statusManagementAPI = {
  getAllStatuses: async (params?: IFetchStatusesParams) => {
    return await ApiClient.get<IFetchStatusesSuccessData>('/status', {
      params,
    })
  },

  getCurrentStatusByProfileAction: async () => {
    return await ApiClient.get<IStatusDetail>(`/status/profile/current`)
  },

  createStatusAction: async (payload: Partial<TUpdateStatusData>) => {
    return await ApiClient.post<IStatusDetail, Omit<TUpdateStatusData, 'id'>>(
      `/status`,
      payload
    )
  },
}
