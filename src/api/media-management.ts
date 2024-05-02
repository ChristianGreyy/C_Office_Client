import { IUploadMediaResponse } from '@/interfaces/media-management'
import { ApiClient } from './axiosClient'

export const mediaManagementAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    console.log('formData', formData)
    return ApiClient.post<IUploadMediaResponse>(`/media`, formData)
  },
}
