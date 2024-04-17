import { createSlice } from '@reduxjs/toolkit'

import { IEmployeeAttendanceDetail } from '@/interfaces'
import { RootState } from '.'
import { getAllEmployeeAttendancesAction, getEmployeeAttendanceByIdAction, createEmployeeAttendanceAction } from '../actions'
interface IEmployeeAttendancesState {
  employeeAttendances: IEmployeeAttendanceDetail[] | null
  priority: IEmployeeAttendanceDetail | null
  employeeAttendancesCurrentPage: string | number
  employeeAttendancesTotalPage: string | number
  employeeAttendancesTotalItems: string | number
  selectedEmployeeAttendance: IEmployeeAttendanceDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IEmployeeAttendancesState = {
  employeeAttendances: [],
  priority: null,
  employeeAttendancesCurrentPage: 0,
  employeeAttendancesTotalPage: 0,
  employeeAttendancesTotalItems: 0,
  selectedEmployeeAttendance: null,
  loadings: {},
}

const employeeAttendancesSlice = createSlice({
  name: 'employeeAttendances',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEmployeeAttendancesAction.pending, (state) => {
      state.loadings[`getAllEmployeeAttendancesActionLoading`] = true
    })
    builder.addCase(getAllEmployeeAttendancesAction.fulfilled, (state, action) => {
      state.loadings[`getAllEmployeeAttendancesActionLoading`] = false
      state.employeeAttendances = action.payload?.items ?? []
      state.employeeAttendancesCurrentPage = action.payload?.page ?? 0
      state.employeeAttendancesTotalPage = action.payload?.limit ?? 0
      state.employeeAttendancesTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllEmployeeAttendancesAction.rejected, (state) => {
      state.loadings[`getAllEmployeeAttendancesActionLoading`] = false
    })
    builder.addCase(getEmployeeAttendanceByIdAction.pending, (state) => {
      state.loadings[`getEmployeeAttendanceByIdActionLoading`] = true
    })
    builder.addCase(getEmployeeAttendanceByIdAction.fulfilled, (state, action) => {
      state.loadings[`getEmployeeAttendanceByIdActionLoading`] = false
      state.priority = action.payload ?? {}
    })
    builder.addCase(getEmployeeAttendanceByIdAction.rejected, (state) => {
      state.loadings[`getEmployeeAttendanceByIdActionLoading`] = false
    })
  },
})

export const employeeAttendancesActions = {
  ...employeeAttendancesSlice.actions,
}

export default employeeAttendancesSlice.reducer
