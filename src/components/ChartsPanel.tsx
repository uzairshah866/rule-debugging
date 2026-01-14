import React from "react";
import { PIE_COLORS } from "../utils/rules";
import type { RuleOutcomeDatum, TransactionsByTypeDatum } from "../types";
import {
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  BarChart,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

interface ChartsPanelProps {
  transactionsByTypeData: TransactionsByTypeDatum[];
  ruleOutcomeData: RuleOutcomeDatum[];
}

export const ChartsPanel: React.FC<ChartsPanelProps> = ({
  transactionsByTypeData,
  ruleOutcomeData,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Transaction Volume by Type
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transactionsByTypeData}>
              <XAxis dataKey="type" />
              <YAxis allowDecimals={false} />
              <RechartsTooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Rule Outcomes (Selected Transaction)
        </h2>
        {ruleOutcomeData.length ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ruleOutcomeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {ruleOutcomeData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">
            Select a transaction to see how many rules were triggered vs passed.
          </p>
        )}
      </div>
    </div>
  );
};
