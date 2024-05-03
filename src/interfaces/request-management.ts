import { IUserDetail } from ".";
import { IGetParams } from "./app";

export interface IFetchRequestsParams extends IGetParams {
  sortOption?: string;
  search?: string;
  type?: string;
  status?: string;
}

export interface IFetchRequestsSuccessData {
  items: IRequestDetail[];
  page?: number | string;
  total?: number | string;
  limit?: number | string;
}

export type IUpdateRequestData = {
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  note: string;
};

export type ICreateAbsenceData = {
  startDate: string;
  endDate: string;
  type: string;
  note: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type ICreateOvertimeData = {
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  note: string;
};

export type TDeleteRequestData = Partial<IRequestDetail> & { isSoft: boolean };

export interface IRequestDetail {
  id?: number;
  startTime: string;
  endTime: string;
  type: string;
  note: string;
  status: string;
  user?: IUserDetail;
  createdAt?: string;
}
