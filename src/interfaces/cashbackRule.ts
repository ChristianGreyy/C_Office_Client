export interface IGetCashbackRulesParams {
  num?: number;
  page: number;
  limit?: number;
  title?: string;
  signal?: AbortSignal;
}
export interface MemberPayload {
  num?: number;
  page: number;
  limit?: number;
  keyword?: string;
  status?: string;
  signal?: AbortSignal;
  start_time?: string | number;
  end_time?: string | number;
  tier_id?: number | string;
  member_type?: string;
}
export interface IRule {
  id: number;
  title: string;
  rule_type: string;
  reward_type: string;
  start_time: string;
  end_time: string;
  spent_amount: number;
  rebate_amount: number;
  fullsum: boolean;
  noend: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetCashbackRuleResponse {
  page: number;
  limit: number;
  rules: IRule[];
  maxPage: number;
  count: number;
}

export interface IGetCashbackRuleRoot {
  success: boolean;
  code: number;
  data: IGetCashbackRuleResponse;
  message: string;
}

export interface IGetOneCashbackRuleRoot {
  success: boolean;
  code: number;
  data: IRule;
  message: string;
}

export interface ICashbackRule extends IRule {
  no?: number | string;
  duration?: string;
}

export interface ICreateCashbackRuleFields {
  title: string;
  rule_type: string;
  reward_type: string;
  start_time: number;
  end_time: number;
  spent_amount: number;
  rebate_amount: number;
  fullsum: boolean;
}
