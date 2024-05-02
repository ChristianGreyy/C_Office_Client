import { createAsyncThunk } from "@reduxjs/toolkit";

import { levelManagementAPI } from "@/api";
import { INITIAL_PAGINATION_SiZE } from "@/configs";
import { IFetchIssuesParams } from "@/interfaces";

export const getAllLevelsAction = createAsyncThunk(
  "levels/getAllLevelsAction",
  async (params: IFetchIssuesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          };
      const res = await levelManagementAPI.getAllLevels(localParams);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
