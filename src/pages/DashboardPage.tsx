import React from "react";

import { RulesPanel } from "../components/RulesPanel";
import { ChartsPanel } from "../components/ChartsPanel";
import { TransactionList } from "../components/TransactionList";
import { TransactionDetails } from "../components/TransactionDetails";
import { HeaderStatsSection } from "../components/HeaderStatsSection";

import rulesData from "../data/example_rules.json";
import transactionsData from "../data/transactions.json";
import featureVectorsData from "../data/feature_vectors.json";
import type {
  Rule,
  Transaction,
  FeatureVector,
  RuleEvaluation,
} from "../types";

import {
  evaluateRule,
  buildRuleOutcomeData,
  TRANSACTION_PAGE_SIZE,
  buildTransactionsById,
  buildTransactionsByTypeData,
  buildFeatureVectorsByTransactionId,
} from "../utils/rules";

const transactions: Transaction[] = transactionsData as Transaction[];
const featureVectors: FeatureVector[] = featureVectorsData as FeatureVector[];
const rules: Rule[] = rulesData as Rule[];

const transactionsById = buildTransactionsById(transactions);
const featureVectorsByTransactionId =
  buildFeatureVectorsByTransactionId(featureVectors);

const TOTAL_TRANSACTION_PAGES = Math.max(
  1,
  Math.ceil(transactions.length / TRANSACTION_PAGE_SIZE)
);

export const DashboardPage: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = React.useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [severityFilter, setSeverityFilter] = React.useState<string>("All");
  const [expandedRules, setExpandedRules] = React.useState<Set<string>>(
    new Set()
  );
  const [transactionPage, setTransactionPage] = React.useState<number>(1);

  const toggleRuleExpansion = (ruleId: string) => {
    const newExpanded = new Set(expandedRules);
    if (newExpanded.has(ruleId)) {
      newExpanded.delete(ruleId);
    } else {
      newExpanded.add(ruleId);
    }
    setExpandedRules(newExpanded);
  };

  const filteredRules = React.useMemo(() => {
    return rules.filter((rule) => {
      const matchesSearch =
        rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity =
        severityFilter === "All" || rule.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    });
  }, [searchTerm, severityFilter]);

  const paginatedTransactions = React.useMemo(() => {
    const start = (transactionPage - 1) * TRANSACTION_PAGE_SIZE;
    return transactions.slice(start, start + TRANSACTION_PAGE_SIZE);
  }, [transactionPage]);

  const transactionsByTypeData = React.useMemo(
    () => buildTransactionsByTypeData(transactions),
    []
  );

  const currentTransaction = React.useMemo(() => {
    if (!selectedTransaction) return null;
    return transactionsById.get(selectedTransaction) ?? null;
  }, [selectedTransaction]);

  const currentFeatures = React.useMemo(() => {
    if (!selectedTransaction) return null;
    return featureVectorsByTransactionId.get(selectedTransaction) ?? null;
  }, [selectedTransaction]);

  const ruleEvaluations: RuleEvaluation[] = React.useMemo(() => {
    if (!currentTransaction || !currentFeatures) return [];
    return filteredRules.map((rule) =>
      evaluateRule(rule, currentTransaction, currentFeatures)
    );
  }, [currentTransaction, currentFeatures, filteredRules]);

  const ruleOutcomeData = React.useMemo(
    () => (ruleEvaluations.length ? buildRuleOutcomeData(ruleEvaluations) : []),
    [ruleEvaluations]
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-6 px-3">
      <div className="max-w-7xl mx-auto">
        <HeaderStatsSection
          totalRules={rules.length}
          totalTransactions={transactions.length}
          triggeredCount={ruleEvaluations.filter((e) => e.passed).length}
          criticalAlertCount={
            ruleEvaluations.filter(
              (e) => e.passed && e.rule.severity === "Critical"
            ).length
          }
        />

        <ChartsPanel
          transactionsByTypeData={transactionsByTypeData}
          ruleOutcomeData={ruleOutcomeData}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TransactionList
            transactions={paginatedTransactions}
            selectedTransactionId={selectedTransaction}
            page={transactionPage}
            totalPages={TOTAL_TRANSACTION_PAGES}
            totalRecords={transactions.length}
            pageSize={TRANSACTION_PAGE_SIZE}
            onSelect={setSelectedTransaction}
            onPageChange={setTransactionPage}
          />

          <TransactionDetails
            transaction={currentTransaction}
            features={currentFeatures}
          />

          <RulesPanel
            rules={filteredRules}
            evaluations={ruleEvaluations}
            expandedRules={expandedRules}
            searchTerm={searchTerm}
            severityFilter={severityFilter}
            onToggleRuleExpansion={toggleRuleExpansion}
            onSearchTermChange={setSearchTerm}
            onSeverityFilterChange={setSeverityFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
