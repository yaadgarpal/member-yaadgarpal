import { useState } from "react";

export default function KYC() {
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Under Review");
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl mx-auto">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">KYC Verification</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Upload documents to verify your identity.</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          status === 'Pending' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {status}
        </span>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        {status === "Pending" ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">PAN Card Number</label>
              <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhaar Card Number</label>
              <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Documents</label>
              <input type="file" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit for Verification
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-gray-900">Your documents are under review.</h3>
            <p className="mt-2 text-sm text-gray-500">We will notify you once your KYC is verified.</p>
          </div>
        )}
      </div>
    </div>
  );
}
