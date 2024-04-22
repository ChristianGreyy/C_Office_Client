import { createAsyncThunk } from '@reduxjs/toolkit'

import { trackerManagementAPI } from '@/api'
import { INITIAL_PAGINATION_SiZE } from '@/configs'
import { IFetchTrackersParams, TUpdateTrackerData } from '@/interfaces'

export const getAllTrackersAction = createAsyncThunk(
  'trackers/getAllTrackersAction',
  async (params: IFetchTrackersParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await trackerManagementAPI.getAllTrackers(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getCurrentTrackerByProfileAction = createAsyncThunk(
  'trackers/getTrackerByProfileAction',
  async () => {
    try {
      const res = await trackerManagementAPI.getCurrentTrackerByProfileAction()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createTrackerAction = createAsyncThunk(
  'trackers/createTrackerAction',
  async (payload: Partial<TUpdateTrackerData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await trackerManagementAPI.createTrackerAction(payload)
      if(res.statusCode !== 201) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)