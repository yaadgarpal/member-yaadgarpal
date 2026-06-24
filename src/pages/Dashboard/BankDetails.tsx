import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Building2,
  CreditCard,
  Plus,
  CheckCircle,
} from "lucide-react";
import { AuthService } from "../../apis/auth.service";

export default function BankDetails() {
  const [banks, setBanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBank, setEditingBank] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    account_no: "",
    ifsc: "",
    bank_name: "",
    branch_name: "",
    is_default: false,
  });

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response =
        await AuthService.getBankAccounts();

      setBanks(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bank accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleIFSCChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.toUpperCase();

    setFormData((prev) => ({
      ...prev,
      ifsc: value,
    }));

    if (value.length === 11) {
      try {
        const response = await fetch(
          `https://ifsc.razorpay.com/${value}`
        );

        const data = await response.json();

        setFormData((prev) => ({
          ...prev,
          ifsc: value,
          bank_name: data.BANK || "",
          branch_name: data.BRANCH || "",
        }));
      } catch (error) {
        toast.error("Invalid IFSC Code");
      }
    }
  };

  const handleAddBank = async (
        e: React.FormEvent
        ) => {
        e.preventDefault();

        try {
            if (editingBank) {
            await AuthService.updateBankAccount(
                editingBank._id,
                formData
            );

            toast.success("Bank updated successfully");
            } else {
            await AuthService.addBankAccount(formData);

            toast.success(
                "Bank account added successfully"
            );
            }

            setEditingBank(null);
            setShowAddForm(false);

            setFormData({
            name: "",
            account_no: "",
            ifsc: "",
            bank_name: "",
            branch_name: "",
            is_default: false,
            });

            fetchBanks();
        } catch (error) {
            toast.error("Operation failed");
        }
    };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <Building2 className="h-10 w-10" />

          <div>
            <h2 className="text-2xl font-bold">
              Bank Accounts
            </h2>

            <p className="text-orange-100">
              Manage your withdrawal bank accounts.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() =>
            setShowAddForm(!showAddForm)
          }
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-5 py-3 rounded-xl"
        >
          <Plus className="h-4 w-4" />
          {showAddForm
            ? "Cancel"
            : "Add Bank Account"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-3xl shadow border p-6">
        <h3 className="text-lg font-semibold mb-5">
            {editingBank
                ? "Update Bank Account"
                : "Add New Bank Account"}
        </h3>
          <form
            onSubmit={handleAddBank}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Account Holder Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              type="text"
              placeholder="Account Number"
              value={formData.account_no}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  account_no:
                    e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              type="text"
              placeholder="IFSC Code"
              value={formData.ifsc}
              onChange={handleIFSCChange}
              className="w-full border rounded-xl px-4 py-3"
              required
            />

            <input
              type="text"
              value={formData.bank_name}
              placeholder="Bank Name"
              readOnly
              className="w-full border rounded-xl px-4 py-3 bg-gray-50"
            />

            <input
              type="text"
              value={formData.branch_name}
              placeholder="Branch Name"
              readOnly
              className="w-full border rounded-xl px-4 py-3 bg-gray-50"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  formData.is_default
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_default:
                      e.target.checked,
                  })
                }
              />
              Set as default account
            </label>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-3 rounded-xl"
            >
              {editingBank
                    ? "Update Bank Account"
                    : "Save Bank Account"
                }
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="bg-white p-10 rounded-3xl text-center">
          Loading...
        </div>
      ) : (
        <div className="grid gap-5">
          {banks.map((bank) => (
            <div
              key={bank._id}
              className="bg-white rounded-3xl shadow border p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-purple-600" />

                    <h3 className="text-lg font-bold">
                      {bank.bank_name}
                    </h3>

                    {bank.is_default && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="mt-4 space-y-2">
                    <p>
                      Holder: {bank.name}
                    </p>

                    <p>
                      Account No:{" "}
                      {bank.account_no}
                    </p>

                    <p>
                      IFSC: {bank.ifsc}
                    </p>

                    <p>
                      Branch:{" "}
                      {bank.branch_name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                <CreditCard className="h-8 w-8 text-gray-400" />

                <button
                    onClick={() => {
                    setEditingBank(bank);

                    setFormData({
                        name: bank.name,
                        account_no: bank.account_no,
                        ifsc: bank.ifsc,
                        bank_name: bank.bank_name,
                        branch_name: bank.branch_name,
                        is_default: bank.is_default,
                    });

                    setShowAddForm(true);
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                    }}

                    
                 className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl text-sm font-medium shadow hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Edit
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}