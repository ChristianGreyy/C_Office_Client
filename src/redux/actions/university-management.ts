import { createAsyncThunk } from "@reduxjs/toolkit";

import { universityManagementAPI } from "@/api";
import { INITIAL_PAGINATION_SiZE } from "@/configs";
import { IFetchIssuesParams, TUpdateIssueData } from "@/interfaces";

export const getAllUniversitiesAction = createAsyncThunk(
  "universities/getAllUniversitiesAction",
  async (params: IFetchIssuesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          };
      const res = await universityManagementAPI.getAllUniversities(localParams);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
