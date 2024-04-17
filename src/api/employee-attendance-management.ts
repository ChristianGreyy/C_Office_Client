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

  getEmployeeAttendanceById: async (id: string) => {
    return await ApiClient.get<IEmployeeAttendanceDetail>(`/employee-attendances/${id}`)
  },

  updateEmployeeAttendanceById: async (payload: Partial<TUpdateEmployeeAttendanceData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<IEmployeeAttendanceDetail, Omit<TUpdateEmployeeAttendanceData, 'id'>>(
      `/employee-attendances/${id}`,
      passPayload
    )
  },

  addEmployeeAttendance: async (payload: Partial<TUpdateEmployeeAttendanceData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: IEmployeeAttendanceDetail; message: string }, {}>(
      `/employee-attendances`,
      passPayload
    )
  },

}
