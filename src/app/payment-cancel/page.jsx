export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

        <h1 className="text-4xl font-black text-red-500">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-gray-500">
          Your payment was cancelled.
        </p>

      </div>
    </div>
  );
}