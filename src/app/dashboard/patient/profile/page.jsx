export default function ProfilePage() {
  return (
    <div className="rounded-3xl border bg-white p-6">
      <h1 className="mb-6 text-3xl font-bold">
        My Profile
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          defaultValue="Sarah Jenkins"
          className="input input-bordered w-full"
        />

        <input
          type="email"
          placeholder="Email"
          defaultValue="sarah@gmail.com"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          placeholder="Phone"
          defaultValue="+880123456789"
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary">
          Update Profile
        </button>
      </div>
    </div>
  );
}