import {
  IFetchProjectsParams,
  IFetchProjectsSuccessData,
  IProjectDetail,
  TUpdateProjectData,
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const projectManagementAPI = {
  getAllProjects: async (params?: IFetchProjectsParams) => {
    return await ApiClient.get<IFetchProjectsSuccessData>('/projects', {
      params,
    })
  },

  getCurrentProjectByProfileAction: async () => {
    return await ApiClient.get<IProjectDetail>(`/projects/profile/current`)
  },

  createProjectAction: async (payload: Partial<TUpdateProjectData>) => {
    return await ApiClient.post<IProjectDetail, Omit<TUpdateProjectData, 'id'>>(
      `/projects`,
      payload
    )
  },
}
