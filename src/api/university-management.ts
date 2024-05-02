import {
  IFetchUniversitiesParams,
  IFetchUniversitiesSuccessData
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const universityManagementAPI = {
  getAllUniversities: async (params?: IFetchUniversitiesParams) => {
    return await ApiClient.get<IFetchUniversitiesSuccessData>('/universities', {
      params,
    })
  },
}
