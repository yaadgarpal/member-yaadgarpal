export default function BookingHistory() {
  const bookings = [
    { id: "BKG-1029", date: "2026-05-12", status: "Completed", amount: "₹1,200", destination: "Goa" },
    { id: "BKG-1030", date: "2026-05-25", status: "Upcoming", amount: "₹3,500", destination: "Manali" },
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Booking History</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Your past and upcoming trips.</p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <li key={booking.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">{booking.destination}</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    Booking ID: {booking.id}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    Date: <time dateTime={booking.date}>{booking.date}</time> • {booking.amount}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
