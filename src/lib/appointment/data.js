const API = process.env.NEXT_PUBLIC_API_URL;

/* ================= APPOINTMENTS ================= */
export const fetchAppointments = async (email = "") => {
  try {
    const res = await fetch(
      `${API}/appointments?email=${email}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.log("fetchAppointments error:", error);
    return [];
  }
};

/* ================= FEATURED DOCTORS ================= */
export const fetchFeaturedAppointment = async () => {
  try {
    const res = await fetch(
      `${API}/featured-doctors`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch featured doctors");
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.log("fetchFeaturedAppointment error:", error);
    return [];
  }
};