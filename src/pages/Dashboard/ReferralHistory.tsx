import { useEffect, useState } from "react";
import { Users, Gift, ArrowRightLeft, X } from "lucide-react";
import { AuthService } from "../../apis/auth.service";
import toast from "react-hot-toast";

export default function ReferralHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTransfer, setShowTransfer] = useState(false);
  const [transferPoints, setTransferPoints] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("");
  const [recipientContact, setRecipientContact] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await AuthService.getReferralHistory();

      const referrals =
        response?.data?.history?.filter(
          (item: any) => item.type === "REFERRAL_REWARD",
        ) || [];

      setHistory(referrals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalCredits = history.reduce(
    (sum, item) =>
      item.transfer_type === "CREDIT"
        ? sum + (parseInt(item.points) || 0)
        : sum,
    0,
  );
  const totalDebits = history.reduce(
    (sum, item) =>
      item.transfer_type === "DEBIT"
        ? sum + (parseInt(item.balancePoints) || parseInt(item.points) || 0)
        : sum,
    0,
  );
  const totalPoints = Math.max(0, totalCredits - totalDebits);

  const appFeatures = [
    {
      id: "booking_discount",
      label: "Booking Discount",
      icon: "🎟️",
      desc: "Use points for booking discounts",
      active: true,
    },
    {
      id: "wallet_credit",
      label: "Wallet Credit",
      icon: "💳",
      desc: "Convert points to wallet balance",
      active: false,
    },
    {
      id: "membership",
      label: "Premium Membership",
      icon: "⭐",
      desc: "Redeem for membership upgrade",
      active: false,
    },
    {
      id: "gift_voucher",
      label: "Gift Voucher",
      icon: "🎁",
      desc: "Exchange points for gift vouchers",
      active: false,
    },
  ];

  const handleTransfer = async () => {
    const pts = parseInt(transferPoints);
    if (!selectedFeature) {
      toast.error("Please select a feature to transfer points to");
      return;
    }
    if (!pts || pts <= 0) {
      toast.error("Please enter a valid points amount");
      return;
    }
    if (pts < 200) {
      toast.error("Minimum 200 points required to transfer");
      return;
    }
    if (pts > totalPoints) {
      toast.error(`Insufficient points. You have ${totalPoints} points`);
      return;
    }
    if (!recipientContact.trim()) {
      toast.error("Please enter email or phone number");
      return;
    }

    try {
      setTransferLoading(true);
      await AuthService.transferPoints({
        email: recipientContact.trim(),
        points: pts,
      });
      toast.success(`${pts} points transferred successfully!`);
      setShowTransfer(false);
      setTransferPoints("");
      setSelectedFeature("");
      setRecipientContact("");
      // Refresh history to reflect updated points
      fetchReferrals();
    } catch (error: any) {
      toast.error(error?.message || "Failed to transfer points");
    } finally {
      setTransferLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Referral History</h2>
              <p className="text-purple-100">
                Track all referral rewards earned.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTransfer(true)}
            className="flex items-center gap-2 bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition text-sm"
          >
            <ArrowRightLeft className="h-4 w-4" />
            Transfer Points
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Credits */}
        <div className="bg-white rounded-2xl shadow border p-5 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 rounded-xl p-3">
            <Gift className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Earned</p>
            <p className="text-3xl font-bold text-green-600">{totalCredits}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              from {history.filter((i) => i.transfer_type === "CREDIT").length}{" "}
              credit
              {history.filter((i) => i.transfer_type === "CREDIT").length !== 1
                ? "s"
                : ""}
            </p>
          </div>
        </div>

        {/* Total Debits */}
        <div className="bg-white rounded-2xl shadow border p-5 flex items-center gap-4">
          <div className="bg-red-100 text-red-500 rounded-xl p-3">
            <ArrowRightLeft className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Transferred</p>
            <p className="text-3xl font-bold text-red-500">{totalDebits}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {history.filter((i) => i.transfer_type === "DEBIT").length} debit
              {history.filter((i) => i.transfer_type === "DEBIT").length !== 1
                ? "s"
                : ""}
            </p>
          </div>
        </div>

        {/* Available */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-purple-600 text-white rounded-xl p-3">
            <ArrowRightLeft className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Available to Transfer</p>
            <p className="text-3xl font-bold text-purple-700">{totalPoints}</p>
            <button
              onClick={() => setShowTransfer(true)}
              className="text-xs text-purple-600 underline mt-0.5 hover:text-purple-800"
            >
              Transfer now →
            </button>
          </div>
        </div>
      </div>

      {/* Referral List */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Referral Rewards</h3>
          <span className="text-sm text-gray-500">
            {history.length} record{history.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No referral rewards found
          </div>
        ) : (
          <div className="divide-y">
            {history.map((item) => (
              <div
                key={item._id}
                className="p-5 flex justify-between items-center hover:bg-gray-50 transition"
              >
                {/* Left: icon + info */}
                <div className="flex items-center gap-3">
                  {/* Credit / Debit circle icon */}
                  <div
                    className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      item.transfer_type === "DEBIT"
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.transfer_type === "DEBIT" ? "↑" : "↓"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.metadata?.registeredUserName
                        ? item.metadata.registeredUserName
                        : item.transfer_type === "DEBIT"
                          ? "Points Transferred Out"
                          : "Referral Reward"}
                    </h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Right: amount + badges */}
                <div className="text-right flex-shrink-0">
                  <p
                    className={`font-bold text-lg ${
                      item.transfer_type === "DEBIT"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {item.transfer_type === "DEBIT" ? "-" : "+"}
                    {parseInt(item.balancePoints) ||
                      parseInt(item.points) ||
                      0}{" "}
                    pts
                  </p>
                  <div className="flex items-center gap-1.5 justify-end mt-1 flex-wrap">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        item.transfer_type === "DEBIT"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.transfer_type === "DEBIT" ? "DEBIT" : "CREDIT"}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transfer Points Modal */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Transfer Points</h3>
                <p className="text-purple-200 text-sm">
                  Available: {totalPoints} points
                </p>
              </div>
              <button
                onClick={() => setShowTransfer(false)}
                className="text-white/80 hover:text-white transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select App Feature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {appFeatures.map((feature) => (
                    <button
                      key={feature.id}
                      disabled={!feature.active}
                      onClick={() =>
                        feature.active && setSelectedFeature(feature.id)
                      }
                      className={`relative text-left p-3 rounded-xl border-2 transition ${
                        !feature.active
                          ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                          : selectedFeature === feature.id
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300 cursor-pointer"
                      }`}
                    >
                      {!feature.active && (
                        <span className="absolute top-2 right-2 text-[10px] bg-yellow-100 text-yellow-700 font-semibold px-1.5 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      )}
                      <span className="text-xl">{feature.icon}</span>
                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        {feature.label}
                      </p>
                      <p className="text-xs text-gray-400">{feature.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points to Transfer
                </label>
                <input
                  type="number"
                  min={200}
                  max={totalPoints}
                  placeholder="Min 200 points"
                  value={transferPoints}
                  onChange={(e) => setTransferPoints(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Minimum 200 points required
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transfer To (Email or Phone)
                </label>
                <input
                  type="text"
                  placeholder="Enter email or phone number"
                  value={recipientContact}
                  onChange={(e) => setRecipientContact(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Enter the registered email or phone of the recipient
                </p>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setShowTransfer(false)}
                  disabled={transferLoading}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransfer}
                  disabled={transferLoading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2"
                >
                  {transferLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Transferring...
                    </>
                  ) : (
                    "Transfer"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
