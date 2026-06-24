import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

export default function KYC() {
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Under Review");
  };

  const statusConfig = {
    Pending: {
      color: "bg-orange-100 text-orange-700",
      icon: <Clock className="h-5 w-5" />,
    },
    "Under Review": {
      color: "bg-blue-100 text-blue-700",
      icon: <Clock className="h-5 w-5" />,
    },
    Approved: {
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    Rejected: {
      color: "bg-red-100 text-red-700",
      icon: <XCircle className="h-5 w-5" />,
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              KYC Verification
            </h2>

            <p className="text-orange-100 mt-1">
              Verify your identity to unlock all features.
            </p>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-3xl shadow border p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              Verification Status
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-1">
              {status}
            </h3>
          </div>

          <span
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              statusConfig[status as keyof typeof statusConfig].color
            }`}
          >
            {
              statusConfig[status as keyof typeof statusConfig]
                .icon
            }
            {status}
          </span>
        </div>
      </div>

      {/* Pending Form */}
      {status === "Pending" && (
        <div className="bg-white rounded-3xl shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Upload Verification Documents
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* PAN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Number
              </label>

              <div className="relative">
                <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  required
                  placeholder="ABCDE1234F"
                  className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Aadhaar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Number
              </label>

              <div className="relative">
                <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  required
                  placeholder="XXXX XXXX XXXX"
                  className="w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* PAN Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload PAN Card
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 hover:border-orange-400 transition">
                <input
                  type="file"
                  required
                  className="w-full"
                />
              </div>
            </div>

            {/* Aadhaar Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Aadhaar Card
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 hover:border-orange-400 transition">
                <input
                  type="file"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Submit for Verification
            </button>
          </form>
        </div>
      )}

      {/* Under Review */}
      {status === "Under Review" && (
        <div className="bg-white rounded-3xl shadow border p-10 text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
            <Clock className="h-10 w-10 text-blue-600" />
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-gray-900">
            Documents Under Review
          </h3>

          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            Our verification team is reviewing your
            submitted documents. This process usually
            takes 24–48 hours.
          </p>
        </div>
      )}

      {/* Approved */}
      {status === "Approved" && (
        <div className="bg-white rounded-3xl shadow border p-10 text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-green-600">
            KYC Approved
          </h3>

          <p className="mt-3 text-gray-500">
            Your account has been successfully verified.
          </p>
        </div>
      )}

      {/* Benefits */}
      <div className="bg-white rounded-3xl shadow border p-6">
        <h3 className="text-lg font-semibold mb-5">
          Benefits of Verification
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-orange-50 rounded-2xl p-4">
            <FileText className="h-8 w-8 text-orange-600 mb-3" />
            <h4 className="font-semibold">
              Faster Withdrawals
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Get quicker processing for rewards and
              payouts.
            </p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-4">
            <ShieldCheck className="h-8 w-8 text-purple-600 mb-3" />
            <h4 className="font-semibold">
              Secure Account
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Protect your account with verified identity.
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-4">
            <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
            <h4 className="font-semibold">
              Full Platform Access
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Unlock all YaadgarPal member features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}