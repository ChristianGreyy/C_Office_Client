import { createAsyncThunk } from '@reduxjs/toolkit'

import { projectManagementAPI } from '@/api'
import { INITIAL_PAGINATION_SiZE } from '@/configs'
import { IFetchProjectsParams, TUpdateProjectData } from '@/interfaces'

export const getAllProjectsAction = createAsyncThunk(
  'projects/getAllProjectsAction',
  async (params: IFetchProjectsParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await projectManagementAPI.getAllProjects(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getCurrentProjectByProfileAction = createAsyncThunk(
  'projects/getProjectByProfileAction',
  async () => {
    try {
      const res = await projectManagementAPI.getCurrentProjectByProfileAction()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createProjectAction = createAsyncThunk(
  'projects/createProjectAction',
  async (payload: Partial<TUpdateProjectData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await projectManagementAPI.createProjectAction(payload)
      if(res.statusCode !== 201) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)