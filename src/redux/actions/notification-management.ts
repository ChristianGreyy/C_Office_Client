import { createAsyncThunk } from "@reduxjs/toolkit";

import { notificationManagementAPI } from "@/api";
import { INITIAL_PAGINATION_SiZE } from "@/configs";
import { IFetchIssuesParams, TUpdateIssueData } from "@/interfaces";

export const getAllNotificationsAction = createAsyncThunk(
  "notifications/getAllNotificationsAction",
  async (params: IFetchIssuesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          };
      const res = await notificationManagementAPI.getAllNotifications(localParams);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllNotificationsActionNumberAction = createAsyncThunk(
  "notifications/getAllNotificationsActionNumber",
  async () => {
    try {
      const res = await notificationManagementAPI.getUnreadNotificationsNumber();
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

