import { useState } from "react";

type Bank = {
  id: string;
  name: string;
  accountNo: string;
  isDefault: boolean;
};

export default function BankDetails() {
  const [banks, setBanks] = useState<Bank[]>([
    { id: "1", name: "HDFC Bank", accountNo: "XXXX-XXXX-1234", isDefault: true },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);

  const setAsDefault = (id: string) => {
    setBanks(banks.map(bank => ({ ...bank, isDefault: bank.id === id })));
  };

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock addition
    setBanks([...banks, { id: Date.now().toString(), name: "New Bank", accountNo: "XXXX-XXXX-9999", isDefault: false }]);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Bank Accounts</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your withdrawal accounts.</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            {showAddForm ? "Cancel" : "Add Bank"}
          </button>
        </div>
        
        {showAddForm && (
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6 bg-gray-50">
            <form className="space-y-4 max-w-xl" onSubmit={handleAddBank}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Save Bank Details
              </button>
            </form>
          </div>
        )}

        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {banks.map((bank) => (
              <li key={bank.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{bank.name}</div>
                    <div className="ml-4 text-sm text-gray-500">{bank.accountNo}</div>
                    {bank.isDefault && (
                      <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    )}
                  </div>
                  <div>
                    {!bank.isDefault && (
                      <button
                        onClick={() => setAsDefault(bank.id)}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
