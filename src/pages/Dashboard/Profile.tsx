import { useEffect, useState } from "react";
import { AuthService } from "../../apis/auth.service";

interface ProfileData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  referral_code: string;
  wallet_amount: number;
  coins: number;
  status: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await AuthService.profile();
      console.log("Profile Data:", response.data);    
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        Loading profile...
      </div>
    );
  }

  return (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-orange-500 rounded-3xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                    {profile?.name?.charAt(0) || "U"}
                </div>

                <div>
                    <h2 className="text-3xl font-bold">
                    {profile?.name}
                    </h2>

                    <p className="text-purple-100 mt-1">
                    {profile?.email}
                    </p>

                    <p className="text-purple-100 text-sm mt-1">
                    {profile?.phone}
                    </p>
                </div>
                </div>

                <button className="bg-white text-purple-700 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                Edit Profile
                </button>
            </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl shadow p-6 border">
                <p className="text-gray-500 text-sm">
                Referral Code
                </p>

                <h3 className="text-xl font-bold text-purple-600 mt-2">
                {profile?.referral_code || "N/A"}
                </h3>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 border">
                <p className="text-gray-500 text-sm">
                Wallet Points
                </p>

                <h3 className="text-xl font-bold text-orange-600 mt-2">
                {profile?.wallet_amount || 0} Points
                </h3>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 border">
                <p className="text-gray-500 text-sm">
                Reward Coins
                </p>

                <h3 className="text-xl font-bold text-green-600 mt-2">
                {profile?.coins || 0}
                </h3>
            </div>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-3xl shadow border overflow-hidden">
            <div className="px-6 py-5 border-b bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <InfoCard
                label="Full Name"
                value={profile?.name}
                />

                <InfoCard
                label="Email Address"
                value={profile?.email}
                />

                <InfoCard
                label="Phone Number"
                value={profile?.phone}
                />

                <InfoCard
                label="Referral Code"
                value={profile?.referral_code}
                />

                <InfoCard
                label="Status"
                value={profile?.status}
                />

                <InfoCard
                label="Address"
                value={profile?.address}
                />
            </div>
            </div>
        </div>
        );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-gray-900 font-medium break-words">
        {value || "-"}
      </p>
    </div>
  );
}