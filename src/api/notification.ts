import { IGetNotificationsParams, INotification } from "@/interfaces";
import { CancelToken } from "axios";
import { ApiClient } from ".";

export const notificationAPI = {
  getListForwarder: (
    params: IGetNotificationsParams,
    cancelToken?: CancelToken
  ) => {
    return ApiClient.get<{ items: INotification[] } | any>("/notifications", {
      params,
      cancelToken,
    });
  },
  getUnreadNumber: (params: { type: string }, cancelToken?: CancelToken) => {
    return ApiClient.get<any>("/notifications", {
      params,
      cancelToken,
    });
  },
  registerFirebaseToken: (payload: {
    token: string;
    deviceId: string;
    deviceType: string;
  }) => {
    return ApiClient.post<any>("/devices/register", payload);
  },
  markAllReaded: () => {
    return ApiClient.put<any>("/notifications");
  },
  markReadNoti: (id: number) => {
    const url = `${"/notifications"}/${id}`;
    return ApiClient.put<any>(url);
  },
};
