import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  User,
  Clock,
  Wallet,
  FileCheck,
  Building2,
  LogOut,
  X,
  Gift,
  LayoutDashboard,
  MoreHorizontal,
  ChevronUp,
  Lock,
  Bell,
} from "lucide-react";
import toast from "react-hot-toast";
import { AuthService } from "../../apis/auth.service";
import { Logo } from "../../assets";


export default function DashboardLayout() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
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
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Wallet History", href: "/dashboard/wallet", icon: Wallet },
    { name: "Refer & Earn", href: "/dashboard/refer", icon: Gift },
    { name: "Change Password", href: "/dashboard/change-password", icon: Lock,
},
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

      {/* ─── Sidebar ─── */}
      <div
        className={`
            hidden md:flex md:flex-col
            md:w-64
            bg-white
            shadow-lg
        `}
        >
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
                //   onClick={() => setSidebarOpen(false)}
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
          <div className="px-4 py-3 flex items-center justify-between">

            {/* Logo */}
            <img
                src={Logo}
                alt="Logo"
                className="h-18 w-auto"
            />

            {/* Right Side */}
            <div className="flex items-center gap-4">

                <button className="relative">
                <Bell className="h-6 w-6 text-gray-700" />

                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <NavLink to="/dashboard/profile">
                <div className="h-9 w-9 rounded-full bg-[#7e22ce] flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                </div>
                </NavLink>

            </div>

            </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
            <Outlet />
          </div>
        </main>
        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50">

        {/* More Menu */}
        {moreOpen && (
            <div className="absolute bottom-16 right-3 w-52 bg-white rounded-xl shadow-xl border">

            <NavLink
                to="/dashboard/refer"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
            >
                <Gift className="w-5 h-5" />
                Refer & Earn
            </NavLink>
            <NavLink
            to = "/dashboard/change-password"
            onClick={() => setMoreOpen(false)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
            >
                <Lock className="w-5 h-5" />
                Change Password
            </NavLink>

            <NavLink
                to="/dashboard/kyc"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
            >
                <FileCheck className="w-5 h-5" />
                KYC
            </NavLink>

            <NavLink
                to="/dashboard/banks"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
            >
                <Building2 className="w-5 h-5" />
                Bank Details
            </NavLink>


            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </button>

            </div>
        )}

        <div className="grid grid-cols-4 h-16">

            <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
                `flex flex-col items-center justify-center ${
                isActive ? "text-[#7e22ce]" : "text-gray-500"
                }`
            }
            >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
            </NavLink>

            <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
                `flex flex-col items-center justify-center ${
                isActive ? "text-[#7e22ce]" : "text-gray-500"
                }`
            }
            >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profile</span>
            </NavLink>


            <NavLink
            to="/dashboard/wallet"
            className={({ isActive }) =>
                `flex flex-col items-center justify-center ${
                isActive ? "text-[#7e22ce]" : "text-gray-500"
                }`
            }
            >
            <Wallet className="w-5 h-5" />
            <span className="text-[10px]">Wallet</span>
            </NavLink>

            <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="flex flex-col items-center justify-center text-gray-500"
            >
            {moreOpen ? (
                <ChevronUp className="w-5 h-5" />
            ) : (
                <MoreHorizontal className="w-5 h-5" />
            )}
            <span className="text-[10px]">More</span>
            </button>

        </div>
        </div>
      </div>
    </div>
    
  );
}
