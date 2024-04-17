import { createSlice } from '@reduxjs/toolkit'

import { IEmployeeAttendanceDetail } from '@/interfaces'
import { getAllEmployeeAttendancesAction, getCurrentEmployeeAttendanceByProfileAction } from '../actions'
interface IEmployeeAttendancesState {
  employeeAttendances: IEmployeeAttendanceDetail[] | null
  employeeAttendance: IEmployeeAttendanceDetail | null
  employeeAttendancesCurrentPage: string | number
  employeeAttendancesTotalPage: string | number
  employeeAttendancesTotalItems: string | number
  selectedEmployeeAttendance: IEmployeeAttendanceDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IEmployeeAttendancesState = {
  employeeAttendances: [],
  employeeAttendance: null,
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
    builder.addCase(getCurrentEmployeeAttendanceByProfileAction.pending, (state) => {
      state.loadings[`getCurrentEmployeeAttendanceByProfileAction`] = true
    })
    builder.addCase(getCurrentEmployeeAttendanceByProfileAction.fulfilled, (state, action) => {
      state.loadings[`getCurrentEmployeeAttendanceByProfileAction`] = false
      state.employeeAttendance = action.payload ?? {}
    })
    builder.addCase(getCurrentEmployeeAttendanceByProfileAction.rejected, (state) => {
      state.loadings[`getCurrentEmployeeAttendanceByProfileActionLoading`] = false
    })
  },
})

export const employeeAttendancesActions = {
  ...employeeAttendancesSlice.actions,
}

export default employeeAttendancesSlice.reducer
