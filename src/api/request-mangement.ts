import {
  IFetchRequestsParams,
  IFetchRequestsSuccessData,
  IRequestDetail,
  TUpdateRequestData,
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const requestManagementAPI = {
  getAllRequests: async (params?: IFetchRequestsParams) => {
    return await ApiClient.get<IFetchRequestsSuccessData>('/requests', {
      params,
    })
  },

  createRequestAction: async (payload: Partial<TUpdateRequestData>) => {
    return await ApiClient.post<IRequestDetail, Omit<TUpdateRequestData, 'id'>>(
      `/requests`,
      payload
    )
  },
}
