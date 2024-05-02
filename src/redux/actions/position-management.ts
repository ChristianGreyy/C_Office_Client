import { createAsyncThunk } from "@reduxjs/toolkit";

import { positionManagementAPI } from "@/api";
import { INITIAL_PAGINATION_SiZE } from "@/configs";
import { IFetchIssuesParams, TUpdateIssueData } from "@/interfaces";

export const getAllPositionsAction = createAsyncThunk(
  "positions/getAllPositionsAction",
  async (params: IFetchIssuesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          };
      const res = await positionManagementAPI.getAllPositions(localParams);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
