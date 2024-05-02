import {
  IFetchPositionsParams,
  IFetchPositionsSuccessData
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const positionManagementAPI = {
  getAllPositions: async (params?: IFetchPositionsParams) => {
    return await ApiClient.get<IFetchPositionsSuccessData>('/positions', {
      params,
    })
  },
}
