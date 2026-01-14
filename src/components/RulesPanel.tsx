import React from "react";
import type { Rule, RuleEvaluation } from "../types";
import { getActionColor, getSeverityColor } from "../utils/rules";
import {
  Search,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

interface RulesPanelProps {
  rules: Rule[];
  evaluations: RuleEvaluation[];
  expandedRules: Set<string>;
  searchTerm: string;
  severityFilter: string;
  onToggleRuleExpansion: (ruleId: string) => void;
  onSearchTermChange: (value: string) => void;
  onSeverityFilterChange: (value: string) => void;
}

export const RulesPanel: React.FC<RulesPanelProps> = ({
  rules,
  evaluations,
  expandedRules,
  searchTerm,
  severityFilter,
  onToggleRuleExpansion,
  onSearchTermChange,
  onSeverityFilterChange,
}) => {
  const evaluationsByRuleId = React.useMemo(
    () =>
      new Map<string, RuleEvaluation>(
        evaluations.map((evaluation) => [evaluation.rule.rule_id, evaluation])
      ),
    [evaluations]
  );

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Rules</h2>
        <select
          value={severityFilter}
          onChange={(e) => onSeverityFilterChange(e.target.value)}
          className="cursor-pointer text-sm border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-2.5 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {rules.map((rule) => {
          const evaluation = evaluationsByRuleId.get(rule.rule_id);
          return (
            <div
              key={rule.rule_id}
              className={`border rounded-lg overflow-hidden transition-all ${
                evaluation?.passed
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <button
                onClick={() => onToggleRuleExpansion(rule.rule_id)}
                className="w-full p-3 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {expandedRules.has(rule.rule_id) ? (
                        <ChevronDown size={16} className="text-slate-600" />
                      ) : (
                        <ChevronRight size={16} className="text-slate-600" />
                      )}
                      <span className="font-semibold text-slate-800 text-sm">
                        {rule.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-6">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${getSeverityColor(
                          rule.severity
                        )} border`}
                      >
                        {rule.severity}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${getActionColor(
                          rule.action
                        )}`}
                      >
                        {rule.action}
                      </span>
                    </div>
                  </div>
                  {evaluation &&
                    (evaluation.passed ? (
                      <AlertTriangle
                        className="text-red-500 shrink-0"
                        size={20}
                      />
                    ) : (
                      <CheckCircle
                        className="text-green-500 shrink-0"
                        size={20}
                      />
                    ))}
                </div>
              </button>

              {expandedRules.has(rule.rule_id) && (
                <div className="px-3 pb-3 border-t border-slate-200 bg-slate-50">
                  <p className="text-xs text-slate-600 mt-3 mb-2">
                    {rule.description}
                  </p>
                  {evaluation && (
                    <div
                      className={`mt-2 p-2 rounded text-xs ${
                        evaluation.passed
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-green-100 text-green-800 border border-green-200"
                      }`}
                    >
                      <div className="font-semibold mb-1">
                        {evaluation.passed
                          ? "✗ Rule Triggered"
                          : "✓ Rule Passed"}
                      </div>
                      <div>{evaluation.reason}</div>
                      {evaluation.affectedFields.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-current/20">
                          <span className="font-semibold">
                            Evaluated Fields:{" "}
                          </span>
                          {evaluation.affectedFields.map((field, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-white/50 px-1.5 py-0.5 rounded mr-1 mt-1"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
