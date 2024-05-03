import {
  IFetchNotificationsParams,
  IFetchNotificationsSuccessData,
  IFetchUnreadNotificationData
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const notificationManagementAPI = {
  getAllNotifications: async (params?: IFetchNotificationsParams) => {
    return await ApiClient.get<IFetchNotificationsSuccessData>('/notifications', {
      params,
    })
  },

  getUnreadNotificationsNumber: async () => {
    return await ApiClient.get<IFetchUnreadNotificationData>('/notifications/unread-number', {
    })
  },

  markAllAsReadNotification: async () => {
    return await ApiClient.put<IFetchUnreadNotificationData>('/notifications/unread-number', {
    })
  },
}
