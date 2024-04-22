import { createAsyncThunk } from '@reduxjs/toolkit'

import { priorityManagementAPI } from '@/api'
import { INITIAL_PAGINATION_SiZE } from '@/configs'
import { IFetchPrioritiesParams, TUpdatePriorityData } from '@/interfaces'

export const getAllPrioritiesAction = createAsyncThunk(
  'priorities/getAllPrioritiesAction',
  async (params: IFetchPrioritiesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await priorityManagementAPI.getAllPriorities(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getCurrentPriorityByProfileAction = createAsyncThunk(
  'priorities/getPriorityByProfileAction',
  async () => {
    try {
      const res = await priorityManagementAPI.getCurrentPriorityByProfileAction()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createPriorityAction = createAsyncThunk(
  'priorities/createPriorityAction',
  async (payload: Partial<TUpdatePriorityData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await priorityManagementAPI.createPriorityAction(payload)
      if(res.statusCode !== 201) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)