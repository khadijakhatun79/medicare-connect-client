export const fetchAppointments = async (search = "") => {
  console.log();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointment?search=${search}`);
  const data = await res.json();
  return data || [];
};

export const fetchFeaturedAppointment = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
  const data = await res.json();
  return data || [];
};

 
