import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { AuthService } from "../../apis/auth.service";

export default function ReferralHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await AuthService.getReferralHistory();

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

  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-2xl shadow border">
        {loading ? (
          <div className="p-8 text-center">
            Loading...
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No referral rewards found
          </div>
        ) : (
          <div className="divide-y">
            {history.map((item) => (
              <div
                key={item._id}
                className="p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.metadata?.registeredUserName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-600 font-bold text-lg">
                    +{item.points} Points
                  </p>

                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
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