import React from "react";
import { DAY_NAMES } from "../utils/rules";
import { DollarSign, MapPin, Search } from "lucide-react";
import type { FeatureVector, Transaction } from "../types";

interface TransactionDetailsProps {
  transaction: Transaction | null;
  features: FeatureVector | null;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
  features,
}) => {
  if (!transaction || !features) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Transaction Details
        </h2>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Search className="text-slate-300 mb-4" size={48} />
          <p className="text-slate-500">Select a transaction to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Transaction Details
      </h2>
      <div className="space-y-4">
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Basic Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Transaction ID:</span>
              <span className="font-mono text-slate-800">
                {transaction.transaction_id}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Amount:</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <DollarSign size={14} />
                {transaction.amount.toFixed(2)} {transaction.currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Type:</span>
              <span className="font-medium text-slate-800">
                {transaction.transaction_type}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Merchant:</span>
              <span className="font-medium text-slate-800 flex items-center gap-1">
                <MapPin size={14} />
                {transaction.merchant_description_condensed}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Location:</span>
              <span className="text-slate-800">
                {transaction.merchant_city}, {transaction.merchant_country}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Feature Vector
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Transaction Count:</span>
              <span className="font-medium text-slate-800">
                {features.transaction_count}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Avg Amount:</span>
              <span className="font-medium text-slate-800">
                ${features.avg_transaction_amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Hour of Day:</span>
              <span className="font-medium text-slate-800">
                {features.hour_of_day}:00
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Day of Week:</span>
              <span className="font-medium text-slate-800">
                {DAY_NAMES[features.day_of_week]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Merchant Avg:</span>
              <span className="font-medium text-slate-800">
                ${features.merchant_avg_transaction_amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
