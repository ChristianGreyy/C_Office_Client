import {
  IFetchEmployeeAttendancesParams,
  IFetchEmployeeAttendancesSuccessData,
  IEmployeeAttendanceDetail,
  TUpdateEmployeeAttendanceData,
} from '@/interfaces'
import { ApiClient } from './axiosClient'

export const employeeAttendanceManagementAPI = {
  getAllEmployeeAttendances: async (params?: IFetchEmployeeAttendancesParams) => {
    return await ApiClient.get<IFetchEmployeeAttendancesSuccessData>('/employee-attendances', {
      params,
    })
  },

  getCurrentEmployeeAttendanceByProfileAction: async () => {
    return await ApiClient.get<IEmployeeAttendanceDetail>(`/employee-attendances/profile/current`)
  },

  createEmployeeAttendanceAction: async (payload: Partial<TUpdateEmployeeAttendanceData>) => {
    return await ApiClient.post<IEmployeeAttendanceDetail, Omit<TUpdateEmployeeAttendanceData, 'id'>>(
      `/employee-attendances`,
      payload
    )
  },
}
