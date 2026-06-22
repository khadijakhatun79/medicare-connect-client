export default function FavoritesPage() {
  const doctors = [
    { name: "Dr. Michael Johnson", spec: "Cardiology" },
    { name: "Dr. Sarah Wilson", spec: "Neurology" },
  ];

  return (
    <div className="p-6 border rounded-3xl bg-white">
      <h1 className="text-2xl font-bold mb-5">Favorite Doctors</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {doctors.map((d, i) => (
          <div key={i} className="p-4 border rounded-xl">
            <h3 className="font-semibold">{d.name}</h3>
            <p className="text-gray-500">{d.spec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}