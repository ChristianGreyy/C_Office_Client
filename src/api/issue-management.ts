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

  getCurrentIssueByProfileAction: async () => {
    return await ApiClient.get<IIssueDetail>(`/issues/profile/current`)
  },

  createIssueAction: async (payload: Partial<TUpdateIssueData>) => {
    return await ApiClient.post<IIssueDetail, Omit<TUpdateIssueData, 'id'>>(
      `/issues`,
      payload
    )
  },
}
