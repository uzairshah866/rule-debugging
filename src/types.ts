export interface Transaction {
  transaction_id: string;
  txn_date_time: string;
  sender_account_id: string;
  receiver_account_id: number;
  amount: number;
  currency: string;
  transaction_type: string;
  terminal_id: number;
  merchant_city: string;
  merchant_country: string;
  merchant_postcode: string | null;
  merchant_description_condensed: string;
}

export interface FeatureVector {
  transaction_id: string;
  sender_account_id: string;
  receiver_account_id: number;
  amount: number;
  currency: string;
  transaction_type: string;
  transaction_count: number;
  avg_transaction_amount: number;
  hour_of_day: number;
  day_of_week: number;
  merchant_avg_transaction_amount: number;
}

export interface Rule {
  rule_id: string;
  name: string;
  description: string;
  action: string;
  severity: string;
}

export interface RuleEvaluation {
  rule: Rule;
  passed: boolean;
  reason: string;
  affectedFields: string[];
}

export interface TransactionsByTypeDatum {
  type: string;
  count: number;
}

export interface RuleOutcomeDatum {
  name: string;
  value: number;
}

