import {
  IFetchLevelsParams,
  IFetchLevelsSuccessData
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const levelManagementAPI = {
  getAllLevels: async (params?: IFetchLevelsParams) => {
    return await ApiClient.get<IFetchLevelsSuccessData>('/levels', {
      params,
    })
  },
}
