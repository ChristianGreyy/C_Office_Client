import { createAsyncThunk } from "@reduxjs/toolkit";

import { userManagementAPI } from "@/api";
import { INITIAL_PAGINATION_SiZE } from "@/configs";
import { IFetchUsersParams, IUserDetail } from "@/interfaces";

export const updateProfileAction = createAsyncThunk(
  "universities/updateProfileAction",
  async (payload: IUserDetail | undefined, { fulfillWithValue, rejectWithValue}) => {
    try {
      const res = await userManagementAPI.updateProfile(payload);
      if(res.statusCode !== 200) {
        console.log('res', res)
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error;
    }
  }
);
export const getAllUsersAction = createAsyncThunk(
  "users/getAllUsersAction",
  async (params: IFetchUsersParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          };
      const res = await userManagementAPI.getAllUsersAction(localParams);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getProfileAction = createAsyncThunk(
  "users/getProfileAction",
  async () => {
    try {
      const res = await userManagementAPI.getProfileAction();
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
