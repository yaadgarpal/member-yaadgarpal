import { useState } from "react";
import {
  Bell,
  Gift,
  CheckCircle2,
  AlertCircle,
  Info,
  Calendar,
  Trash2,
  CheckCheck,
} from "lucide-react";

type NotifCategory = "all" | "rewards" | "bookings" | "kyc" | "system";

interface Notif {
  id: number;
  type: "reward" | "booking" | "kyc" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFS: Notif[] = [
  {
    id: 1,
    type: "reward",
    title: "🎉 Referral Reward Earned!",
    message: "You earned 100 points for referring Rahul Sharma.",
    time: "2 mins ago",
    read: false,
  },
  {
    id: 2,
    type: "booking",
    title: "✅ Booking Confirmed",
    message: "Your booking for Goa trip on 15 July has been confirmed.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "kyc",
    title: "📋 KYC Under Review",
    message: "Your KYC documents are being verified. This may take 24–48 hrs.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 4,
    type: "reward",
    title: "🏆 Milestone Unlocked!",
    message: "You reached the Explorer badge — 100 bonus points added.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "system",
    title: "🔐 Password Changed",
    message: "Your account password was changed successfully.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "booking",
    title: "🚌 Upcoming Trip Reminder",
    message: "Your Manali trip is in 3 days. Stay prepared!",
    time: "2 days ago",
    read: true,
  },
  {
    id: 7,
    type: "reward",
    title: "💰 Points Expiry Alert",
    message: "200 of your points will expire in 15 days. Use them soon!",
    time: "3 days ago",
    read: true,
  },
  {
    id: 8,
    type: "kyc",
    title: "✅ KYC Approved",
    message: "Your KYC verification is complete. All features are now unlocked.",
    time: "1 week ago",
    read: true,
  },
];

const typeIcon = {
  reward: <Gift className="h-5 w-5 text-purple-600" />,
  booking: <Calendar className="h-5 w-5 text-blue-600" />,
  kyc: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  system: <Info className="h-5 w-5 text-gray-500" />,
};

const typeBg = {
  reward: "bg-purple-50",
  booking: "bg-blue-50",
  kyc: "bg-green-50",
  system: "bg-gray-50",
};

const CATEGORIES: { key: NotifCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "rewards", label: "Rewards" },
  { key: "bookings", label: "Bookings" },
  { key: "kyc", label: "KYC" },
  { key: "system", label: "System" },
];

export default function Notifications() {
  const [notifs, setNotifs] = useState<Notif[]>(MOCK_NOTIFS);
  const [activeTab, setActiveTab] = useState<NotifCategory>("all");

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: number) =>
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const deleteNotif = (id: number) =>
    setNotifs((prev) => prev.filter((n) => n.id !== id));

  const filtered = notifs.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "rewards") return n.type === "reward";
    if (activeTab === "bookings") return n.type === "booking";
    if (activeTab === "kyc") return n.type === "kyc";
    if (activeTab === "system") return n.type === "system";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-gray-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-8 w-8" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Notifications</h2>
              <p className="text-gray-400 text-sm">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up!"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Coming Soon block — blurred tabs + list */}
      <div className="relative rounded-2xl overflow-hidden border shadow bg-white">
        {/* Blurred content */}
        <div className="blur-sm pointer-events-none select-none">
          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap p-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="divide-y">
            {MOCK_NOTIFS.slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-start gap-4 p-5">
                <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center ${typeBg[n.type]}`}>
                  {typeIcon[n.type]}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${!n.read ? "text-gray-900" : "text-gray-500"}`}>
                    {n.title}
                    {!n.read && <span className="ml-2 inline-block h-2 w-2 bg-blue-500 rounded-full align-middle" />}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.message}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl px-10 py-8 text-center max-w-sm">
            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-800">Coming Soon</h3>
            <p className="text-sm text-gray-500 mt-2">
              Real-time notifications for rewards, bookings, KYC updates and more
              will be available here shortly.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-4 uppercase tracking-widest">Stay Tuned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
