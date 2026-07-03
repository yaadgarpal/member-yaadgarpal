import { useEffect, useState } from "react";
import { Copy, Check, Wallet, User, Shield } from "lucide-react";
import { AuthService } from "../../apis/auth.service";
import toast from "react-hot-toast";

export default function DashboardHome() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await AuthService.profile();

      console.log(response);

      setProfile(response.data); // agar data na aaye to response.data.data try karenge
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const [copiedType, setCopiedType] = useState<"referral" | "booking" | null>(null);

    const handleCopy = (code: string, type: "referral" | "booking") => {
    if (!code) return;

    navigator.clipboard.writeText(code);
    setCopiedType(type);

    toast.success(
        `${type === "referral" ? "Referral" : "Booking"} code copied!`
    );

    setTimeout(() => setCopiedType(null), 2000);
    };
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-2xl font-bold">
          Welcome, {profile?.name}
        </h2>

        <p className="mt-2 opacity-90">
          Manage your profile, bookings and rewards.
        </p>
      </div>

      {/* Referral & Booking Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Referral Code */}
        <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">

            <div>
            <h2 className="text-lg font-semibold text-gray-900">
                Referral Code
            </h2>

            <p className="text-sm text-gray-500">
                Share this code to earn rewards.
            </p>

            <p className="mt-3 text-2xl font-mono font-bold text-purple-600">
                {profile?.referral_code || "N/A"}
            </p>
            </div>

            <button
            onClick={() =>
                handleCopy(profile?.referral_code, "referral")
            }
            className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition"
            >
            {copiedType === "referral" ? (
                <Check className="h-5 w-5 text-green-500" />
            ) : (
                <Copy className="h-5 w-5 text-purple-600" />
            )}
            </button>

        </div>

        {/* Booking Code */}
        <div className="bg-white shadow rounded-xl p-6 flex items-center justify-between">

            <div>
            <h2 className="text-lg font-semibold text-gray-900">
                Booking Code
            </h2>

            <p className="text-sm text-gray-500">
                Share this booking code.
            </p>

            <p className="mt-3 text-2xl font-mono font-bold text-orange-500">
                {profile?.booking_code || "N/A"}
            </p>
            </div>

            <button
            onClick={() =>
                handleCopy(profile?.booking_code, "booking")
            }
            className="bg-orange-100 p-3 rounded-full hover:bg-orange-200 transition"
            >
            {copiedType === "booking" ? (
                <Check className="h-5 w-5 text-green-500" />
            ) : (
                <Copy className="h-5 w-5 text-orange-600" />
            )}
            </button>

        </div>

        </div>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-green-600" />
            <h3 className="text-sm text-gray-500">
              Wallet Balance
            </h3>
          </div>

          <p className="mt-3 text-3xl font-bold">
            ₹{Number(profile?.wallet_amount ?? 0).toFixed(2)}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm text-gray-500">
              Email
            </h3>
          </div>

          <p className="mt-3 text-sm break-all">
            {profile?.email}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-600" />
            <h3 className="text-sm text-gray-500">
              KYC Status
            </h3>
          </div>

          <p className="mt-3 font-semibold text-orange-500">
            {profile?.kyc_status || "Pending"}
          </p>
        </div>
      </div>
    </div>
  );
}