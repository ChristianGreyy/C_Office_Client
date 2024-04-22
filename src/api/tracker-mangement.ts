import {
  IFetchTrackersParams,
  IFetchTrackersSuccessData,
  ITrackerDetail,
  TUpdateTrackerData,
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const trackerManagementAPI = {
  getAllTrackers: async (params?: IFetchTrackersParams) => {
    return await ApiClient.get<IFetchTrackersSuccessData>('/trackers', {
      params,
    })
  },

  getCurrentTrackerByProfileAction: async () => {
    return await ApiClient.get<ITrackerDetail>(`/trackers/profile/current`)
  },

  createTrackerAction: async (payload: Partial<TUpdateTrackerData>) => {
    return await ApiClient.post<ITrackerDetail, Omit<TUpdateTrackerData, 'id'>>(
      `/trackers`,
      payload
    )
  },
}
