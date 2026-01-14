import React from "react";
import { Clock } from "lucide-react";
import type { Transaction } from "../types";

interface TransactionListProps {
  transactions: Transaction[];
  selectedTransactionId: string | null;
  page: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  onSelect: (transactionId: string) => void;
  onPageChange: (page: number) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  selectedTransactionId,
  page,
  totalPages,
  totalRecords,
  pageSize,
  onSelect,
  onPageChange,
}) => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const [pageInput, setPageInput] = React.useState<number>(page);

  /* ---------------- Scroll reset on page change ---------------- */
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
    setPageInput(page);
  }, [page]);

  /* ---------------- Pagination handlers ---------------- */
  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(Number(e.target.value));
  };

  const commitPageChange = () => {
    if (!pageInput || pageInput < 1) {
      onPageChange(1);
    } else if (pageInput > totalPages) {
      onPageChange(totalPages);
    } else {
      onPageChange(pageInput);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitPageChange();
      (e.target as HTMLInputElement).blur();
    }
  };

  /* ---------------- Record range ---------------- */
  const startRecord = (page - 1) * pageSize + 1;
  const endRecord = Math.min(page * pageSize, totalRecords);

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6 flex flex-col">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Transactions
      </h2>

      {/* ---------------- Transaction list ---------------- */}
      <div ref={listRef} className="space-y-2 max-h-96 overflow-y-auto flex-1">
        {transactions.map((txn) => (
          <button
            key={txn.transaction_id}
            onClick={() => onSelect(txn.transaction_id)}
            className={`w-full text-left p-3 rounded-lg border transition-all ${
              selectedTransactionId === txn.transaction_id
                ? "bg-blue-50 border-blue-300 shadow-sm"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-slate-600">
                {txn.transaction_id}
              </span>
              <span
                className={`text-sm font-semibold ${
                  txn.amount > 1000 ? "text-red-600" : "text-slate-700"
                }`}
              >
                ${txn.amount.toFixed(2)}
              </span>
            </div>

            <div className="text-xs text-slate-600 truncate">
              {txn.merchant_description_condensed}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                {txn.transaction_type}
              </span>
              <Clock size={10} className="text-slate-400" />
              <span className="text-xs text-slate-500">
                {txn.txn_date_time.split(" ")[0]}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ---------------- Footer ---------------- */}
      <div className="mt-4 space-y-2">
        <div className="text-xs text-slate-500">
          Showing {startRecord}–{endRecord} of {totalRecords} transactions
        </div>

        <div className="flex items-center justify-between text-sm text-slate-700">
          <button
            className="cursor-pointer px-3 py-1 border border-slate-300 rounded disabled:opacity-50"
            onClick={handlePrevious}
            disabled={page === 1}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span>Page</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={pageInput}
              onChange={handlePageInputChange}
              onBlur={commitPageChange}
              onKeyDown={handleKeyDown}
              className="w-16 px-2 py-1 border border-slate-300 rounded text-center"
            />
            <span>of {totalPages}</span>
          </div>

          <button
            className="cursor-pointer px-3 py-1 border border-slate-300 rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
