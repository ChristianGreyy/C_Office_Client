import { enumStatus } from '@configs';
import { CancelToken } from 'axios';
import { DropdownProps } from './app';

export interface IGetTiersParams {
  num?: number;
  page: number;
  name?: string;
  signal?: AbortSignal;
  status?: boolean | enumStatus;
}

export interface ITiersFields {
  name: string;
  type: string;
}

export interface Tier {
  id: number;
  name: string;
  description: string;
  status: boolean;
  cash_threshold: number | string;
  period: number | string;
  cash_to_remain: number | string;
  standard_cash_rule: number | string;
  superior_cash_rule: number | string;
  standard_point_rule: number | string;
  superior_point_rule: number | string;
  cashback_birthday_percent: number | string;
  point_birthday_percent: number | string;
  discount_type: number | string;
  topup_value_rule: number | string;
  reward_store_price_level: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  index: number;
  benefit?: IWelcomeBenefits[];
}

export interface TierResponse {
  page: number;
  limit: number;
  tiers: Tier[];
  count: number;
  maxPage: number;
}

export interface TierRoot {
  success: boolean;
  code: number;
  data: TierResponse;
  message: string;
}
export interface TierResponseRoot {
  success: boolean;
  code: number;
  data: Tier;
  message: string;
}
export interface ITierParams {
  name?: string;
  description?: string;
  status?: boolean;
  cash_threshold?: number;
  period?: number;
  cash_to_remain?: number;
  standard_cash_rule?: number;
  superior_cash_rule?: number;
  standard_point_rule?: number;
  birthday_cash_rule?: number;
  birthday_point_rule?: number;
  discount_type?: number;
  topup_value_rule?: number;
  reward_store_price_level?: number;
  benefit?: IWelcomeBenefits[];
}

export interface ITierOptions {
  id: number;
  name: string;
  description: string;
  status: boolean;
  cash_threshold: number | string;
  period: number | string;
  cash_to_remain: number | string;
  standard_cash_rule: number | string;
  superior_cash_rule: number | string;
  standard_point_rule: number | string;
  superior_point_rule: number | string;
  cashback_birthday_percent: number | string;
  point_birthday_percent: number | string;
  discount_type: number | string;
  topup_value_rule: number | string;
  reward_store_price_level: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  index: number;
}

export interface IUpdateTierLevelBody {
  tiers: Array<{ id: number; index: number }>;
}
export interface IWelcomeBenefits {
  id: string;
  type?: string;
  value: number | string;
}
