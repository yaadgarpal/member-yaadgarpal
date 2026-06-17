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
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Personal details and account information.
          </p>
        </div>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700">
          Edit Profile
        </button>
      </div>

      <div className="border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <ProfileRow label="Full Name" value={profile?.name} />
          <ProfileRow label="Email" value={profile?.email} />
          <ProfileRow label="Phone" value={profile?.phone} />
          <ProfileRow label="Address" value={profile?.address} />
          <ProfileRow label="Referral Code" value={profile?.referral_code} />
          <ProfileRow
            label="Wallet Balance"
            value={`₹${profile?.wallet_amount ?? 0}`}
          />
          <ProfileRow
            label="Coins"
            value={`${profile?.coins ?? 0}`}
          />
          <ProfileRow label="Status" value={profile?.status} />
        </dl>
      </div>
    </div>
  );
}

function ProfileRow({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value || "-"}
      </dd>
    </div>
  );
}