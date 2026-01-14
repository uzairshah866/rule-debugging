import React from "react";
import { Filter, TrendingUp, AlertTriangle, XCircle } from "lucide-react";

interface HeaderStatsSectionProps {
  totalRules: number;
  totalTransactions: number;
  triggeredCount: number;
  criticalAlertCount: number;
}

export const HeaderStatsSection: React.FC<HeaderStatsSectionProps> = ({
  totalRules,
  totalTransactions,
  triggeredCount,
  criticalAlertCount,
}) => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Rule Debugging Dashboard
        </h1>
        <p className="text-slate-600">
          Analyze and debug transaction rules in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Rules</p>
              <p className="text-2xl font-bold text-slate-800">{totalRules}</p>
            </div>
            <Filter className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Transactions</p>
              <p className="text-2xl font-bold text-slate-800">
                {totalTransactions}
              </p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Rules Triggered</p>
              <p className="text-2xl font-bold text-slate-800">
                {triggeredCount}
              </p>
            </div>
            <AlertTriangle className="text-orange-500" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-slate-800">
                {criticalAlertCount}
              </p>
            </div>
            <XCircle className="text-red-500" size={32} />
          </div>
        </div>
      </div>
    </>
  );
};
