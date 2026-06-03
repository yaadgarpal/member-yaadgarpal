import { useState } from "react";
import toast from "react-hot-toast";

export default function WalletHistory() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const transactions = [
    { id: "TXN-001", date: "2026-06-01", type: "Referral Bonus", amount: "+₹500", status: "Success" },
    { id: "TXN-002", date: "2026-05-28", type: "Withdrawal", amount: "-₹1,000", status: "Success" },
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    
    if (amount > 4500) {
      toast.error("Insufficient balance.");
      return;
    }

    toast.success(`Withdrawal request for ₹${amount} submitted successfully!`);
    setShowWithdraw(false);
    setWithdrawAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Wallet</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your current balance and history.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-green-600">₹4,500</p>
            </div>
            <button
              onClick={() => setShowWithdraw(!showWithdraw)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>

        {showWithdraw && (
          <div className="border-t border-gray-200 px-4 py-5 bg-gray-50">
            <form onSubmit={handleWithdraw} className="max-w-sm">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount to Withdraw (₹)
              </label>
              <div className="mt-2 flex gap-3">
                <input
                  type="number"
                  id="amount"
                  min="100"
                  placeholder="e.g. 1000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
                />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Submit
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">Minimum withdrawal is ₹100.</p>
            </form>
          </div>
        )}

        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {transactions.map((txn) => (
              <li key={txn.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{txn.type}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`text-sm font-semibold ${txn.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                      {txn.amount}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      TXN ID: {txn.id}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      <time dateTime={txn.date}>{txn.date}</time> • {txn.status}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
