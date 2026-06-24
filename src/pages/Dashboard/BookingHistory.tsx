import {
  CalendarDays,
  MapPin,
  Ticket,
  IndianRupee,
} from "lucide-react";

export default function BookingHistory() {
  const bookings = [
    {
      id: "BKG-1029",
      date: "2026-05-12",
      status: "Completed",
      amount: "1,200",
      destination: "Goa",
    },
    {
      id: "BKG-1030",
      date: "2026-05-25",
      status: "Upcoming",
      amount: "3,500",
      destination: "Manali",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold">
          Booking History
        </h2>

        <p className="text-orange-100 mt-2">
          View all your past and upcoming bookings.
        </p>
      </div>

      {/* Booking Cards */}
      <div className="grid gap-5">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              {/* Left Side */}
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {booking.destination}
                  </h3>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Ticket className="h-4 w-4" />
                    Booking ID: {booking.id}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CalendarDays className="h-4 w-4" />
                    {booking.date}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <IndianRupee className="h-4 w-4" />
                    {booking.amount}
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    booking.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status}
                </span>

                <button className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm hover:bg-purple-700 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="bg-white rounded-3xl shadow p-10 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            No Bookings Found
          </h3>

          <p className="text-gray-500 mt-2">
            Your booking history will appear here.
          </p>
        </div>
      )}
    </div>
  );
}