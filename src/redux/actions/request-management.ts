import { createAsyncThunk } from '@reduxjs/toolkit'

import { requestManagementAPI } from '@/api'
import { INITIAL_PAGINATION_SiZE } from '@/configs'
import { IFetchRequestsParams, TUpdateRequestData } from '@/interfaces'

export const getAllRequestsAction = createAsyncThunk(
  'requests/getAllRequestsAction',
  async (params: IFetchRequestsParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await requestManagementAPI.getAllRequests(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createRequestAction = createAsyncThunk(
  'requests/createRequestAction',
  async (payload: Partial<TUpdateRequestData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await requestManagementAPI.createRequestAction(payload)
      if(res.statusCode !== 201) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)