import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import { AuthService } from "../../apis/auth.service";

export default function ReferralHistory() {
  const [history, setHistory] =useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await AuthService.getReferralHistory();
      console.log("Referral History Response:", response);

      const referrals =
        response?.data?.history?.filter(
          (item: any) => item.type === "REFERRAL_REWARD"
        ) || [];

      setHistory(referrals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Total Coins
  const totalCoins = useMemo(() => {
    return history.reduce(
      (total, item) => total + (item.points || 0),
      0
    );
  }, [history]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8" />

          <div>
            <h2 className="text-2xl font-bold">
              Referral History
            </h2>

            <p className="text-purple-100">
              Track all referral rewards earned.
            </p>
          </div>
        </div>
      </div>

      {/* Total Coins Card */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">
              Total Referral Coins
            </p>

            <h2 className="text-4xl font-bold text-purple-600 mt-1">
              🪙 {totalCoins}
            </h2>
          </div>

          <div className="bg-purple-100 p-4 rounded-full">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Referral History */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading...
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No referral rewards found.
          </div>
        ) : (
          <div className="divide-y">
            {history.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-5 hover:bg-gray-50 transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.metadata?.registeredUserName || "Unknown User"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-600 font-bold text-xl">
                    +{item.points} Coins
                  </p>

                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    {item.status}
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