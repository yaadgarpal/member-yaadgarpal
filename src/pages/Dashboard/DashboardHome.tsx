import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function DashboardHome() {
  const [copied, setCopied] = useState(false);
  const referralCode = "YAADGAR-2026-XQ";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Your Referral Code</h2>
          <p className="text-sm text-gray-500">Share this code to earn rewards!</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
          <span className="text-xl font-mono font-bold text-indigo-600 mr-4">
            {referralCode}
          </span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-indigo-600 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards for dashboard stats */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Total Referrals</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">12</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Wallet Balance</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">₹4,500</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Pending KYC</h3>
          <p className="mt-2 text-xl font-medium text-orange-500">Action Required</p>
        </div>
      </div>
    </div>
  );
}
