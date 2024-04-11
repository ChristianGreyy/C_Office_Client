import { IGetRoot } from './app';
import { IMerchantInfo } from './auth';

export interface IGetMerchantInfo extends IGetRoot {
  data: IMerchantInfo;
}

export interface IUpdateGeneralInfoBody {
  email: string;
  people_amount: number;
  business_type: string;
  phone: string;
  work_phone: string;
}
