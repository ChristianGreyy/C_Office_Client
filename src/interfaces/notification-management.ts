import { IGetParams } from ".";

export interface IFetchNotificationsParams extends IGetParams {
  sortOption?: string;
  search?: string;
  statusId?: string;
  priorityId?: string;
  trackerId?: string;
}

export interface IFetchNotificationsSuccessData {
  items: INotificationDetail[];
  page?: number | string;
  total?: number | string;
  limit?: number | string;
}

export interface IFetchUnreadNotificationData {
  unreadNumber: number
}


export interface INotificationDetail {
  action: string;
  body: string;
  client: string;
  createdAt: string;
  data: any;
  id: number;
  isRead: boolean;
  title: string;
  type: string;
  updatedAt: string;
  userId: number;
}

export interface TUnreadNumber {
  auction: number;
  delivery_reminder: number;
}
