import type {
  Rule,
  Transaction,
  FeatureVector,
  RuleEvaluation,
  RuleOutcomeDatum,
  TransactionsByTypeDatum,
} from "../types";

export const TRANSACTION_PAGE_SIZE = 50;

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const PIE_COLORS = ["#ef4444", "#22c55e"];

export const evaluateRule = (
  rule: Rule,
  transaction: Transaction,
  features: FeatureVector
): RuleEvaluation => {
  switch (rule.rule_id) {
    case "RULE_001":
      return {
        rule,
        passed: transaction.amount > 1000,
        reason:
          transaction.amount > 1000
            ? `Transaction amount ($${transaction.amount}) exceeds threshold of $1000`
            : `Transaction amount ($${transaction.amount}) is below threshold of $1000`,
        affectedFields: ["amount"],
      };
    case "RULE_002":
      return {
        rule,
        passed:
          features.transaction_count > 5 &&
          features.avg_transaction_amount < 20,
        reason:
          features.transaction_count > 5 && features.avg_transaction_amount < 20
            ? `High frequency detected: ${features.transaction_count
            } transactions with avg amount $${features.avg_transaction_amount.toFixed(
              2
            )}`
            : `Normal frequency: ${features.transaction_count} transactions`,
        affectedFields: ["transaction_count", "avg_transaction_amount"],
      };
    case "RULE_003":
      return {
        rule,
        passed: transaction.transaction_type === "wire",
        reason:
          transaction.transaction_type === "wire"
            ? `Unusual transaction type detected: ${transaction.transaction_type}`
            : `Normal transaction type: ${transaction.transaction_type}`,
        affectedFields: ["transaction_type"],
      };
    case "RULE_004": {
      const isHighRisk = transaction.merchant_description_condensed
        .toLowerCase()
        .includes("high risk");
      return {
        rule,
        passed: isHighRisk,
        reason: isHighRisk
          ? `High-risk merchant detected: ${transaction.merchant_description_condensed}`
          : `Merchant is not flagged as high-risk: ${transaction.merchant_description_condensed}`,
        affectedFields: ["merchant_description_condensed"],
      };
    }
    default:
      return {
        rule,
        passed: false,
        reason: "Rule evaluation not implemented",
        affectedFields: [],
      };
  }
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case "Critical":
      return "text-red-600 bg-red-50 border-red-200";
    case "High":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "Medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    default:
      return "text-blue-600 bg-blue-50 border-blue-200";
  }
};

export const getActionColor = (action: string): string => {
  switch (action) {
    case "Block":
      return "bg-red-100 text-red-800";
    case "Alert":
      return "bg-orange-100 text-orange-800";
    case "Review":
      return "bg-yellow-100 text-yellow-800";
    case "Investigate":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const buildTransactionsById = (
  transactions: Transaction[]
): Map<string, Transaction> =>
  new Map(transactions.map((txn) => [txn.transaction_id, txn]));

export const buildFeatureVectorsByTransactionId = (
  featureVectors: FeatureVector[]
): Map<string, FeatureVector> =>
  new Map(featureVectors.map((fv) => [fv.transaction_id, fv]));

export const buildTransactionsByTypeData = (
  transactions: Transaction[]
): TransactionsByTypeDatum[] => {
  const counts = new Map<string, number>();
  for (const txn of transactions) {
    const current = counts.get(txn.transaction_type) ?? 0;
    counts.set(txn.transaction_type, current + 1);
  }
  return Array.from(counts.entries()).map(([type, count]) => ({
    type,
    count,
  }));
};

export const buildRuleOutcomeData = (
  evaluations: RuleEvaluation[]
): RuleOutcomeDatum[] => {
  const triggeredCount = evaluations.filter((e) => e.passed).length;
  const passedCount = evaluations.length - triggeredCount;
  return [
    { name: "Triggered", value: triggeredCount },
    { name: "Passed", value: passedCount },
  ];
};

