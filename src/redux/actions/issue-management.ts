import { createAsyncThunk } from "@reduxjs/toolkit";

import { issueManagementAPI } from "@/api";
import { INITIAL_PAGINATION_SiZE } from "@/configs";
import { IFetchIssuesParams, TUpdateIssueData } from "@/interfaces";

export const getAllIssuesAction = createAsyncThunk(
  "issues/getAllIssuesAction",
  async (params: IFetchIssuesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          };
      const res = await issueManagementAPI.getAllIssues(localParams);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getIssueByIdAction = createAsyncThunk(
  "issues/getIssueByProfileAction",
  async (id: number) => {
    try {
      const res = await issueManagementAPI.getIssueByIdAction(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createIssueAction = createAsyncThunk(
  "issues/createIssueAction",
  async (
    payload: Partial<TUpdateIssueData>,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const res = await issueManagementAPI.createIssueAction(payload);
      if (res.statusCode !== 201) {
        return rejectWithValue(res);
      }
      return fulfillWithValue(res.data);
    } catch (error) {
      throw error;
    }
  }
);

export const updateIssueAction = createAsyncThunk(
  "issues/updateIssueAction",
  async (
    payload: Partial<TUpdateIssueData>,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { id, ...passPayload } = payload;
      const res = await issueManagementAPI.updateIssueAction(id, passPayload);
      if (res.statusCode !== 200) {
        return rejectWithValue(res);
      }
      return fulfillWithValue(res.data);
    } catch (error) {
      throw error;
    }
  }
);
