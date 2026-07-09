import { useEffect, useState } from "react";
import { AuthService } from "../../apis/auth.service";
import {
  Trophy,
  Star,
  Zap,
  CheckCircle2,
  Lock,
  TrendingUp,
  Calendar,
  Gift,
} from "lucide-react";

// ─── Milestone config ─────────────────────────────────────────────────────────
const MILESTONES = [
  {
    count: 1,
    label: "First Step",
    icon: "🚀",
    reward: "Welcome Bonus – 50 Points",
    color: "from-blue-400 to-blue-600",
    ringColor: "ring-blue-400",
    bg: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    count: 3,
    label: "Explorer",
    icon: "🗺️",
    reward: "100 Bonus Points",
    color: "from-green-400 to-emerald-600",
    ringColor: "ring-green-400",
    bg: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    count: 5,
    label: "Adventurer",
    icon: "⛺",
    reward: "5% Discount Coupon",
    color: "from-yellow-400 to-orange-500",
    ringColor: "ring-yellow-400",
    bg: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  {
    count: 10,
    label: "Voyager",
    icon: "✈️",
    reward: "200 Points + Free Upgrade",
    color: "from-orange-400 to-red-500",
    ringColor: "ring-orange-400",
    bg: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    count: 20,
    label: "Elite Traveller",
    icon: "👑",
    reward: "500 Points + VIP Access",
    color: "from-purple-500 to-violet-700",
    ringColor: "ring-purple-500",
    bg: "bg-purple-50",
    textColor: "text-purple-700",
  },
  {
    count: 50,
    label: "Legend",
    icon: "🏆",
    reward: "1000 Points + Lifetime Benefits",
    color: "from-pink-500 to-rose-600",
    ringColor: "ring-pink-500",
    bg: "bg-pink-50",
    textColor: "text-pink-700",
  },
];

function getNextMilestone(count: number) {
  return MILESTONES.find((m) => m.count > count) || MILESTONES[MILESTONES.length - 1];
}

function getCurrentMilestone(count: number) {
  const passed = MILESTONES.filter((m) => m.count <= count);
  return passed[passed.length - 1] || null;
}

export default function BookingProgress() {
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      // Fetch profile for real data if available
      const response = await AuthService.profile();
      // Use total_bookings field if backend provides it, else default mock
      const count = response?.data?.total_bookings ?? 4; // mock: 4
      setBookingCount(count);
    } catch (err) {
      console.error(err);
      setBookingCount(4); // fallback mock
    } finally {
      setLoading(false);
    }
  };

  const nextMilestone = getNextMilestone(bookingCount);
  const currentMilestone = getCurrentMilestone(bookingCount);

  // Progress between current milestone and next
  const prevCount = currentMilestone ? currentMilestone.count : 0;
  const progressPct = Math.min(
    100,
    Math.round(((bookingCount - prevCount) / (nextMilestone.count - prevCount)) * 100)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center text-gray-400">Loading your journey...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Booking Progress</h2>
            <p className="text-indigo-200 text-sm mt-0.5">
              Complete more bookings to unlock exclusive rewards
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats Row ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Bookings */}
        <div className="bg-white rounded-2xl border shadow p-5 flex items-center gap-4">
          <div className="bg-indigo-100 text-indigo-600 rounded-xl p-3">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">Total Bookings</p>
            <p className="text-3xl font-extrabold text-gray-900 leading-tight">{bookingCount}</p>
          </div>
        </div>

        {/* Current Badge */}
        <div className="bg-white rounded-2xl border shadow p-5 flex items-center gap-4">
          <div className="bg-purple-100 text-purple-600 rounded-xl p-3">
            <Star className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">Current Badge</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">
              {currentMilestone ? `${currentMilestone.icon} ${currentMilestone.label}` : "Getting started…"}
            </p>
          </div>
        </div>

        {/* Next Reward */}
        <div className="bg-white rounded-2xl border shadow p-5 flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-600 rounded-xl p-3">
            <Gift className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">Next Reward</p>
            <p className="text-sm font-semibold text-gray-800 leading-tight">{nextMilestone.reward}</p>
            <p className="text-xs text-gray-400 mt-0.5">at {nextMilestone.count} bookings</p>
          </div>
        </div>
      </div>

      {/* ── Progress Bar ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border shadow p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Progress to <span className="text-purple-600">{nextMilestone.icon} {nextMilestone.label}</span>
          </span>
          <span className="text-sm font-bold text-purple-600">
            {bookingCount} / {nextMilestone.count} bookings
          </span>
        </div>

        {/* Track */}
        <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-violet-600 transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
          {/* Glitter dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-white border-2 border-purple-500 rounded-full shadow-md transition-all duration-700"
            style={{ left: `calc(${progressPct}% - 10px)` }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-400 mt-1.5">
          <span>{prevCount} bookings</span>
          <span>{progressPct}% complete</span>
          <span>{nextMilestone.count} bookings</span>
        </div>

        <p className="text-sm text-gray-500 mt-3 text-center">
          🎯 <strong>{nextMilestone.count - bookingCount}</strong> more booking{nextMilestone.count - bookingCount !== 1 ? "s" : ""} to unlock{" "}
          <span className="font-semibold text-purple-700">{nextMilestone.reward}</span>
        </p>
      </div>

      {/* ── Journey Timeline ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border shadow overflow-hidden">
        <div className="p-5 border-b flex items-center gap-2">
          <Trophy className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Reward Journey</h3>
        </div>

        <div className="p-6">
          <div className="relative">
            {/* Vertical spine */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100" />

            <div className="space-y-6">
              {MILESTONES.map((milestone, idx) => {
                const unlocked = bookingCount >= milestone.count;
                const isCurrent =
                  currentMilestone?.count === milestone.count;
                const isNext = nextMilestone.count === milestone.count && !unlocked;

                return (
                  <div key={idx} className="relative flex items-start gap-4 pl-2">
                    {/* Icon bubble */}
                    <div
                      className={`relative z-10 flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-xl shadow-md ring-2 ${
                        unlocked
                          ? `bg-gradient-to-br ${milestone.color} ${milestone.ringColor} ring-offset-2`
                          : isNext
                          ? "bg-gray-50 ring-purple-300 ring-offset-2 animate-pulse"
                          : "bg-gray-100 ring-gray-200"
                      }`}
                    >
                      {unlocked ? (
                        milestone.icon
                      ) : isNext ? (
                        <Zap className="h-5 w-5 text-purple-400" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-300" />
                      )}
                    </div>

                    {/* Content card */}
                    <div
                      className={`flex-1 rounded-xl p-4 border transition ${
                        unlocked
                          ? `${milestone.bg} border-transparent`
                          : isNext
                          ? "bg-purple-50 border-purple-200 border-dashed"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <p
                            className={`font-bold text-sm ${
                              unlocked ? milestone.textColor : isNext ? "text-purple-600" : "text-gray-400"
                            }`}
                          >
                            {milestone.icon} {milestone.label}
                            {isCurrent && (
                              <span className="ml-2 text-[10px] bg-white border border-current px-2 py-0.5 rounded-full font-semibold">
                                CURRENT
                              </span>
                            )}
                            {isNext && (
                              <span className="ml-2 text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
                                NEXT
                              </span>
                            )}
                          </p>
                          <p
                            className={`text-xs mt-0.5 ${
                              unlocked ? milestone.textColor : "text-gray-400"
                            } opacity-80`}
                          >
                            {milestone.count} bookings required
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              unlocked
                                ? "bg-white/60 " + milestone.textColor
                                : isNext
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            🎁 {milestone.reward}
                          </span>
                          {unlocked && (
                            <CheckCircle2 className={`h-5 w-5 ${milestone.textColor}`} />
                          )}
                        </div>
                      </div>

                      {/* Mini progress if this is the active next milestone */}
                      {isNext && (
                        <div className="mt-3">
                          <div className="h-1.5 bg-purple-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full transition-all duration-700"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-purple-500 mt-1">
                            {bookingCount - prevCount} / {milestone.count - prevCount} done
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Motivational Footer ───────────────────────────────────── */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-purple-100 rounded-2xl p-5 text-center">
        <p className="text-purple-700 font-semibold text-sm">
          🌟 Keep booking to unlock bigger rewards and become a YaadgarPal Legend!
        </p>
      </div>
    </div>
  );
}
