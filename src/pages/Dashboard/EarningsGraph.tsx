import { BarChart2, Lock } from "lucide-react";

// Fake bar heights for the blurred background chart
const FAKE_BARS = [40, 65, 50, 80, 55, 90, 70, 85, 60, 75, 95, 50];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function EarningsGraph() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <BarChart2 className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Earnings Graph</h2>
            <p className="text-teal-100 text-sm mt-0.5">
              Visualize your referral & booking earnings over time
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Block */}
      <div className="relative rounded-2xl overflow-hidden border shadow bg-white">
        {/* ── Blurred fake chart background ── */}
        <div className="blur-sm pointer-events-none select-none p-6 space-y-6">
          {/* Fake stat cards */}
          <div className="grid grid-cols-3 gap-4">
            {["Total Earned", "This Month", "Avg / Month"].map((label, i) => (
              <div key={i} className="bg-gray-50 border rounded-xl p-4">
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-2xl font-extrabold text-gray-800 mt-1">
                  {["₹12,400", "₹3,200", "₹1,033"][i]}
                </p>
              </div>
            ))}
          </div>

          {/* Fake bar chart */}
          <div className="bg-gray-50 border rounded-xl p-5">
            <p className="text-sm font-semibold text-gray-600 mb-4">Monthly Earnings (₹)</p>
            <div className="flex items-end gap-2 h-40">
              {FAKE_BARS.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-teal-500 to-cyan-400"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[9px] text-gray-400">{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fake line chart area */}
          <div className="bg-gray-50 border rounded-xl p-5">
            <p className="text-sm font-semibold text-gray-600 mb-4">Points Earned Over Time</p>
            <div className="h-24 bg-gradient-to-r from-teal-100 via-cyan-200 to-teal-100 rounded-lg" />
          </div>
        </div>

        {/* ── Coming Soon overlay ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <div className="bg-white border border-teal-200 shadow-2xl rounded-2xl px-10 py-8 text-center max-w-sm">
            <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-800">Coming Soon</h3>
            <p className="text-sm text-gray-500 mt-2">
              We're building an interactive earnings dashboard with month-wise charts,
              filters and export options.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-2 w-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="h-2 w-2 bg-teal-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="h-2 w-2 bg-teal-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-xs text-teal-500 font-semibold mt-4 uppercase tracking-widest">
              Stay Tuned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
