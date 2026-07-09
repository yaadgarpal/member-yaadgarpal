import { useState } from "react";
import { Trophy, Medal, Crown, Star, TrendingUp, Users } from "lucide-react";

type Period = "weekly" | "monthly" | "alltime";

interface LeaderEntry {
  rank: number;
  name: string;
  referrals: number;
  points: number;
  badge: string;
  isYou?: boolean;
}

const DATA: Record<Period, LeaderEntry[]> = {
  weekly: [
    { rank: 1, name: "Priya Sharma", referrals: 12, points: 1200, badge: "👑" },
    { rank: 2, name: "Arun Mehta", referrals: 9, points: 900, badge: "🥈" },
    { rank: 3, name: "Sneha Gupta", referrals: 7, points: 700, badge: "🥉" },
    { rank: 4, name: "Vikram Singh", referrals: 6, points: 600, badge: "⭐" },
    { rank: 5, name: "Pooja Patel", referrals: 5, points: 500, badge: "⭐" },
    { rank: 6, name: "You", referrals: 4, points: 400, badge: "🚀", isYou: true },
    { rank: 7, name: "Raj Kumar", referrals: 3, points: 300, badge: "🎯" },
    { rank: 8, name: "Anita Joshi", referrals: 2, points: 200, badge: "🎯" },
    { rank: 9, name: "Deepak Rao", referrals: 1, points: 100, badge: "🎯" },
    { rank: 10, name: "Meera Das", referrals: 1, points: 100, badge: "🎯" },
  ],
  monthly: [
    { rank: 1, name: "Arun Mehta", referrals: 45, points: 4500, badge: "👑" },
    { rank: 2, name: "Priya Sharma", referrals: 38, points: 3800, badge: "🥈" },
    { rank: 3, name: "You", referrals: 31, points: 3100, badge: "🥉", isYou: true },
    { rank: 4, name: "Vikram Singh", referrals: 28, points: 2800, badge: "⭐" },
    { rank: 5, name: "Sneha Gupta", referrals: 22, points: 2200, badge: "⭐" },
    { rank: 6, name: "Pooja Patel", referrals: 18, points: 1800, badge: "🎯" },
    { rank: 7, name: "Raj Kumar", referrals: 15, points: 1500, badge: "🎯" },
    { rank: 8, name: "Anita Joshi", referrals: 10, points: 1000, badge: "🎯" },
    { rank: 9, name: "Deepak Rao", referrals: 8, points: 800, badge: "🎯" },
    { rank: 10, name: "Meera Das", referrals: 5, points: 500, badge: "🎯" },
  ],
  alltime: [
    { rank: 1, name: "Vikram Singh", referrals: 210, points: 21000, badge: "👑" },
    { rank: 2, name: "Arun Mehta", referrals: 185, points: 18500, badge: "🥈" },
    { rank: 3, name: "Priya Sharma", referrals: 162, points: 16200, badge: "🥉" },
    { rank: 4, name: "Sneha Gupta", referrals: 130, points: 13000, badge: "⭐" },
    { rank: 5, name: "Pooja Patel", referrals: 110, points: 11000, badge: "⭐" },
    { rank: 6, name: "Raj Kumar", referrals: 85, points: 8500, badge: "🎯" },
    { rank: 7, name: "Anita Joshi", referrals: 60, points: 6000, badge: "🎯" },
    { rank: 8, name: "You", referrals: 42, points: 4200, badge: "🚀", isYou: true },
    { rank: 9, name: "Deepak Rao", referrals: 30, points: 3000, badge: "🎯" },
    { rank: 10, name: "Meera Das", referrals: 18, points: 1800, badge: "🎯" },
  ],
};

const PERIODS: { key: Period; label: string }[] = [
  { key: "weekly", label: "This Week" },
  { key: "monthly", label: "This Month" },
  { key: "alltime", label: "All Time" },
];

const rankStyle: Record<number, string> = {
  1: "from-yellow-400 to-amber-500 text-white",
  2: "from-gray-300 to-gray-400 text-white",
  3: "from-orange-300 to-orange-500 text-white",
};

const rankIcon: Record<number, JSX.Element> = {
  1: <Crown className="h-4 w-4" />,
  2: <Medal className="h-4 w-4" />,
  3: <Medal className="h-4 w-4" />,
};

export default function Leaderboard() {
  const [period, setPeriod] = useState<Period>("monthly");
  const data = DATA[period];
  const youEntry = data.find((e) => e.isYou);
  const top3 = data.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Leaderboard</h2>
            <p className="text-orange-100 text-sm mt-0.5">
              Top referrers in the YaadgarPal community
            </p>
          </div>
        </div>
      </div>

      {/* Period Tabs */}
      <div className="flex gap-2">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition border ${
              period === p.key
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-amber-300"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Coming Soon block — blurred leaderboard content */}
      <div className="relative rounded-2xl overflow-hidden border shadow bg-white">
        {/* Blurred content */}
        <div className="blur-sm pointer-events-none select-none p-6 space-y-5">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-3">
            {[top3[1], top3[0], top3[2]].map((entry, i) => {
              if (!entry) return null;
              const actualRank = entry.rank;
              const heights = ["h-24", "h-32", "h-20"];
              return (
                <div key={entry.rank} className={`flex flex-col items-center justify-end ${heights[i]}`}>
                  <span className="text-2xl mb-1">{entry.badge}</span>
                  <p className="text-xs font-bold text-gray-700 text-center leading-tight mb-1">
                    {entry.name.split(" ")[0]}
                  </p>
                  <div
                    className={`w-full rounded-t-xl bg-gradient-to-t ${rankStyle[actualRank]} flex flex-col items-center justify-center py-2 shadow-md`}
                    style={{ minHeight: i === 1 ? "5rem" : i === 0 ? "4rem" : "3rem" }}
                  >
                    <span className="text-sm font-black">#{actualRank}</span>
                    <p className="text-[11px] font-semibold mt-0.5 opacity-90">{entry.referrals} refs</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Your Rank Banner */}
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">#6</div>
              <div>
                <p className="text-sm font-bold text-purple-700">Your Position</p>
                <p className="text-xs text-purple-500">4 referrals · 400 points</p>
              </div>
            </div>
            <span className="text-xs text-purple-600 font-semibold bg-white border border-purple-200 px-3 py-1.5 rounded-full">Rank #6</span>
          </div>

          {/* Table preview */}
          <div className="divide-y border rounded-xl overflow-hidden">
            {data.slice(0, 5).map((entry) => (
              <div key={entry.rank} className="flex items-center gap-4 px-5 py-3">
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  entry.rank <= 3 ? `bg-gradient-to-br ${rankStyle[entry.rank]}` : "bg-gray-100 text-gray-500"
                }`}>
                  {entry.rank <= 3 ? entry.badge : `#${entry.rank}`}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{entry.name}</p>
                  <p className="text-xs text-gray-400">{entry.referrals} referrals</p>
                </div>
                <p className="text-sm font-bold text-amber-600">{entry.points} pts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <div className="bg-white border border-amber-200 shadow-2xl rounded-2xl px-10 py-8 text-center max-w-sm">
            <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-800">Coming Soon</h3>
            <p className="text-sm text-gray-500 mt-2">
              A live community leaderboard showing top referrers and rewards
              is being built. Stay competitive!
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-2 w-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="h-2 w-2 bg-amber-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="h-2 w-2 bg-amber-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-xs text-amber-500 font-semibold mt-4 uppercase tracking-widest">Stay Tuned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
