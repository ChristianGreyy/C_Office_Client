import {
  IDashboardParams,
  IFetchNewUserStatSuccessData,
  IFetchRevenueStatSuccessData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const dashboardAPI = {
  getRevenueStat: async (params: IDashboardParams) => {
    return await ApiClient.get<IFetchRevenueStatSuccessData>(
      '/transaction/stats',
      {
        params,
      }
    )
  },

  getNewUserStat: async (params: IDashboardParams) => {
    return await ApiClient.get<IFetchNewUserStatSuccessData>('/users/stats', {
      params,
    })
  },
}
