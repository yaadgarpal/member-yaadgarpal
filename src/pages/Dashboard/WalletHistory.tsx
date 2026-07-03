import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Wallet, ArrowDownLeft, IndianRupee } from "lucide-react";
import { AuthService } from "../../apis/auth.service";

export default function WalletHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

    useEffect(() => {
    console.log("useEffect called");
    fetchProfile();
    fetchWalletHistory();
    }, []);

  const fetchProfile = async () => {
    try {
      const response = await AuthService.profile();

      setWalletBalance(
        response?.data?.wallet_amount || 0
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWalletHistory = async () => {
    try {
      const response = await AuthService.getOnlyWalletHistory();
    

      setHistory(
        response?.data?.history || []
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to load wallet history");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();

    const amount = Number(withdrawAmount);

    if (!withdrawAmount.trim()) {
        toast.error("Please enter withdrawal amount");
        return;
    }


    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount < 100) {
        toast.error("Minimum withdrawal amount is ₹100");
        return;
    }

    if (amount > walletBalance) {
      toast.error("Insufficient balance");
      return;
    }

    toast.success(
      `Withdrawal request for ₹${Number(amount).toFixed(2)} submitted`
    );

    setWithdrawAmount("");
    setShowWithdraw(false);
  };

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <Wallet className="h-8 w-8" />

          <div>
            <p className="text-orange-100">
              Available Balance
            </p>

            <h2 className="text-4xl font-bold mt-1">
              ₹{Number(walletBalance).toFixed(2)}
            </h2>
          </div>
        </div>
      </div>

      {/* Withdraw Section */}
      <div className="bg-white rounded-2xl shadow border">
        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Withdraw Amount
            </h3>

            <p className="text-sm text-gray-500">
              Transfer your earnings to bank account
            </p>
          </div>

          <button
            onClick={() =>
              setShowWithdraw(!showWithdraw)
            }
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Withdraw
          </button>
        </div>

        {showWithdraw && (
          <div className="border-t p-5">
            <form
              onSubmit={handleWithdraw}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) =>
                  setWithdrawAmount(e.target.value)
                }
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Submit
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-2">
              Minimum withdrawal ₹100
            </p>
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">
            Wallet History
          </h3>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            Loading...
          </div>
        ) : history.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No transactions found
          </div>
        ) : (
          <div className="divide-y">
            {history.map((txn) => (
              <div
                key={txn._id}
                className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <ArrowDownLeft className="h-5 w-5 text-green-600" />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      {txn.type.replaceAll("_", " ")}
                    </h4>

                    <p className="text-sm text-gray-500 mt-1">
                      {txn.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(
                        txn.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                    {txn.type === "WALLET_CREDIT" ? (
                        <div className="text-green-600 font-bold text-lg flex items-center justify-end gap-1">
                        <IndianRupee className="h-4 w-4" />
                        {Number(txn.walletAmount).toFixed(2)}
                        </div>
                    ) : (
                        <div className="text-blue-600 font-bold text-lg">
                        +{Number(txn.points).toFixed(2)} Points
                        </div>
                    )}

                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        txn.status === "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                        {txn.status}
                    </span>
                    </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}