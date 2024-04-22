import { createAsyncThunk } from '@reduxjs/toolkit'

import { statusManagementAPI } from '@/api'
import { INITIAL_PAGINATION_SiZE } from '@/configs'
import { IFetchStatusesParams, TUpdateStatusData } from '@/interfaces'

export const getAllStatusesAction = createAsyncThunk(
  'statuses/getAllStatusesAction',
  async (params: IFetchStatusesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await statusManagementAPI.getAllStatuses(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getCurrentStatusByProfileAction = createAsyncThunk(
  'statuses/getStatusByProfileAction',
  async () => {
    try {
      const res = await statusManagementAPI.getCurrentStatusByProfileAction()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createStatusAction = createAsyncThunk(
  'statuses/createStatusAction',
  async (payload: Partial<TUpdateStatusData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await statusManagementAPI.createStatusAction(payload)
      if(res.statusCode !== 201) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)