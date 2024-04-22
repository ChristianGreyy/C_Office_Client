import {
  IFetchPrioritiesParams,
  IFetchPrioritiesSuccessData,
  IPriorityDetail,
  TUpdatePriorityData,
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const priorityManagementAPI = {
  getAllPriorities: async (params?: IFetchPrioritiesParams) => {
    return await ApiClient.get<IFetchPrioritiesSuccessData>('/priorities', {
      params,
    })
  },

  getCurrentPriorityByProfileAction: async () => {
    return await ApiClient.get<IPriorityDetail>(`/priorities/profile/current`)
  },

  createPriorityAction: async (payload: Partial<TUpdatePriorityData>) => {
    return await ApiClient.post<IPriorityDetail, Omit<TUpdatePriorityData, 'id'>>(
      `/priorities`,
      payload
    )
  },
}
