import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { User, Clock, Wallet, FileCheck, Building2, LogOut, Copy, Check, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { AuthService } from "../../apis/auth.service";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
    }, []);

    const fetchProfile = async () => {
    try {
        const response = await AuthService.profile();

        console.log(response);

        setProfile(response.data);
    } catch (error) {
        console.error(error);
    }
 };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: User },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Booking History", href: "/dashboard/bookings", icon: Clock },
    { name: "Wallet History", href: "/dashboard/wallet", icon: Wallet },
    { name: "KYC", href: "/dashboard/kyc", icon: FileCheck },
    { name: "Bank Details", href: "/dashboard/banks", icon: Building2 },
  ];

    const referralCode = profile?.referral_code || "N/A";
    const bookingCode = profile?.booking_code || "N/A";

  const handleCopy = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`${type} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");
  };
  

  return (
    <div className="flex h-screen bg-gray-100">

      {/* ─── Mobile Sidebar Overlay ─── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─── */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <img src="/public/image.png" alt="YaadgarPal Logo" className="h-16 w-auto" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === "/dashboard"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#7e22ce]/10 text-[#7e22ce]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between gap-3">

            {/* Left: Hamburger + Brand (mobile) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-gray-600 hover:text-[#7e22ce] transition-colors"
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <span className="text-xl font-bold text-[#7e22ce] md:hidden">YaadgarPal</span>
            </div>

            {/* Right: Codes */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 ml-auto">
              {/* Referral Code Badge */}
              <div
                onClick={() => handleCopy(referralCode, "Referral code")}
                className="flex items-center bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 px-2.5 py-1.5 rounded-full cursor-pointer transition-all active:scale-95"
                title="Click to copy Referral Code"
              >
                <span className="text-[10px] sm:text-xs font-semibold mr-1.5 uppercase tracking-wide">Ref:</span>
                <span className="text-xs sm:text-sm font-mono font-bold mr-1.5">{referralCode}</span>
                {copiedCode === referralCode ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 opacity-70" />
                )}
              </div>

              {/* Booking Code Badge */}
              <div
                onClick={() => handleCopy(bookingCode, "Booking code")}
                className="flex items-center bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 px-2.5 py-1.5 rounded-full cursor-pointer transition-all active:scale-95"
                title="Click to copy Booking Code"
              >
                <span className="text-[10px] sm:text-xs font-semibold mr-1.5 uppercase tracking-wide">Booking:</span>
                <span className="text-xs sm:text-sm font-mono font-bold mr-1.5">{bookingCode}</span>
                {copiedCode === bookingCode ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 opacity-70" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
