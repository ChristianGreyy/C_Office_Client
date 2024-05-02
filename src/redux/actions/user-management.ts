import { createAsyncThunk } from "@reduxjs/toolkit";

import { userManagementAPI } from "@/api";
import { INITIAL_PAGINATION_SiZE } from "@/configs";
import { IUserDetail } from "@/interfaces";

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
