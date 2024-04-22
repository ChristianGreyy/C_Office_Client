import {
  IFetchIssuesParams,
  IFetchIssuesSuccessData,
  IIssueDetail,
  TUpdateIssueData,
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const issueManagementAPI = {
  getAllIssues: async (params?: IFetchIssuesParams) => {
    return await ApiClient.get<IFetchIssuesSuccessData>('/issues', {
      params,
    })
  },

  getIssueByIdAction: async (id: number) => {
    return await ApiClient.get<IIssueDetail>(`/issues/${id}`)
  },

  createIssueAction: async (payload: Partial<TUpdateIssueData>) => {
    return await ApiClient.post<IIssueDetail, Omit<TUpdateIssueData, 'id'>>(
      `/issues`,
      payload
    )
  },
}
