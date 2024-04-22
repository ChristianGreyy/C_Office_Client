import {
  IFetchProjectsParams,
  IFetchProjectsSuccessData,
  IProjectDetail,
  IProjectMember,
  TUpdateProjectData,
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const projectManagementAPI = {
  getAllProjects: async (params?: IFetchProjectsParams) => {
    return await ApiClient.get<IFetchProjectsSuccessData>('/projects', {
      params,
    })
  },

  getProjectByIdAction: async (id: number) => {
    return await ApiClient.get<IProjectDetail>(`/projects/${id}`)
  },

  getMembersForProjectAction: async (id: number) => {
    return await ApiClient.get<IProjectMember[]>(`/projects/members/${id}`)
  },


  createProjectAction: async (payload: Partial<TUpdateProjectData>) => {
    return await ApiClient.post<IProjectDetail, Omit<TUpdateProjectData, 'id'>>(
      `/projects`,
      payload
    )
  },
}
