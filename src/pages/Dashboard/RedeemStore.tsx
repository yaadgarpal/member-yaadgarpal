import { ShoppingBag, Lock, Star } from "lucide-react";

const FAKE_ITEMS = [
  { name: "Goa Trip Discount", points: 500, tag: "🏖️ Travel", rating: 4.8 },
  { name: "Hotel Upgrade", points: 800, tag: "🏨 Stay", rating: 4.5 },
  { name: "₹200 Wallet Credit", points: 200, tag: "💳 Wallet", rating: 4.9 },
  { name: "Adventure Package", points: 1200, tag: "🧗 Adventure", rating: 4.7 },
  { name: "Free Bus Ticket", points: 300, tag: "🚌 Transport", rating: 4.3 },
  { name: "Premium Membership", points: 2000, tag: "👑 VIP", rating: 5.0 },
];

export default function RedeemStore() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">Redeem Points Store</h2>
            <p className="text-pink-100 text-sm mt-0.5">
              Exchange your earned points for exciting rewards
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Block */}
      <div className="relative rounded-2xl overflow-hidden border shadow bg-white">
        {/* ── Blurred fake store ── */}
        <div className="blur-sm pointer-events-none select-none p-6">
          {/* Fake search / filter bar */}
          <div className="flex gap-3 mb-5">
            <div className="flex-1 h-10 bg-gray-100 rounded-xl" />
            <div className="w-24 h-10 bg-pink-100 rounded-xl" />
            <div className="w-24 h-10 bg-gray-100 rounded-xl" />
          </div>

          {/* Fake category chips */}
          <div className="flex gap-2 mb-5">
            {["All", "Travel", "Wallet", "Stay", "VIP"].map((c) => (
              <div
                key={c}
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  c === "All" ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                {c}
              </div>
            ))}
          </div>

          {/* Fake cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FAKE_ITEMS.map((item, i) => (
              <div key={i} className="border rounded-2xl p-4 bg-gray-50">
                {/* Image placeholder */}
                <div className="h-28 bg-gradient-to-br from-pink-100 to-rose-200 rounded-xl mb-3 flex items-center justify-center text-4xl">
                  {item.tag.split(" ")[0]}
                </div>
                <span className="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-semibold">
                  {item.tag}
                </span>
                <p className="text-sm font-bold text-gray-800 mt-2">{item.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-500">{item.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-extrabold text-pink-600">
                    {item.points} pts
                  </span>
                  <div className="bg-pink-500 text-white text-xs px-3 py-1 rounded-lg font-semibold">
                    Redeem
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Coming Soon overlay ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <div className="bg-white border border-pink-200 shadow-2xl rounded-2xl px-10 py-8 text-center max-w-sm">
            <div className="h-16 w-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-800">Coming Soon</h3>
            <p className="text-sm text-gray-500 mt-2">
              Our rewards marketplace is under construction. Soon you'll be able to
              redeem points for travel deals, wallet credits, upgrades and more!
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-2 w-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="h-2 w-2 bg-pink-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="h-2 w-2 bg-pink-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-xs text-pink-500 font-semibold mt-4 uppercase tracking-widest">
              Stay Tuned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
