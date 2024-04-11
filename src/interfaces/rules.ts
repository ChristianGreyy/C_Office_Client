import { IGetRoot } from './app';
export interface Rule {
  id: number;
  title: string;
  rule_type: string;
  reward_type: string;
  start_time: string;
  end_time: string;
  spent_amount: number;
  rebate_amount: number;
  fullsum: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RuleResponse {
  page: number;
  limit: number;
  rules: Rule[];
  count: number;
}

export interface RuleRoot {
  success: boolean;
  code: number;
  data: RuleResponse;
  message: string;
}
export enum RULE_TYPE {
  standard = 'standard',
  superior = 'superior',
  birthday = 'birthday',
}
export enum REWARD_TYPE {
  cashback = 'cashback',
  point = 'point',
}
export interface RuleDropdowns {
  standard_cashback_rules: Array<{ value: string; label: string }>;
  superior_cashback_rules: Array<{ value: string; label: string }>;
  standard_points_rules: Array<{ value: string; label: string }>;
  superior_points_rules: Array<{ value: string; label: string }>;
}

export interface IGetRulesParams {
  num?: number;
  limit?: number;
  page: number;
  title?: string;
}

export interface IUpdateBirthdaySpecialBody {
  cashback_birthday_percent?: number;
  point_birthday_percent?: number;
  coupon_birthday?: number | string;
}

export interface IBirthdaySpecialRule {
  cashback_birthday_percent: number;
  point_birthday_percent: number;
  coupon_birthday: number | string;
}

export interface IGetBirthdaySpecialRoot extends IGetRoot {
  data: IBirthdaySpecialRule;
}
