import { createAsyncThunk } from '@reduxjs/toolkit'

import { employeeAttendanceManagementAPI } from '@/api'
import { INITIAL_PAGINATION_SiZE } from '@/configs'
import { IFetchEmployeeAttendancesParams, TUpdateEmployeeAttendanceData } from '@/interfaces'

export const getAllEmployeeAttendancesAction = createAsyncThunk(
  'employeeAttendances/getAllEmployeeAttendancesAction',
  async (params: IFetchEmployeeAttendancesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await employeeAttendanceManagementAPI.getAllEmployeeAttendances(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getEmployeeAttendanceByIdAction = createAsyncThunk(
  'employeeAttendances/getEmployeeAttendanceByIdAction',
  async (id: string) => {
    try {
      const res = await employeeAttendanceManagementAPI.getEmployeeAttendanceById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateEmployeeAttendanceByIdAction = createAsyncThunk(
  'employeeAttendances/updateEmployeeAttendanceByIdAction',
  async (payload: Partial<TUpdateEmployeeAttendanceData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await employeeAttendanceManagementAPI.updateEmployeeAttendanceById(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)

export const addEmployeeAttendanceAction = createAsyncThunk(
  'employeeAttendances/addEmployeeAttendanceAction',
  async (payload: Partial<TUpdateEmployeeAttendanceData>, { fulfillWithValue }) => {
    try {
      const res = await employeeAttendanceManagementAPI.addEmployeeAttendance(payload)
      return res;
    } catch (error) {
      throw error
    }
  }
)
