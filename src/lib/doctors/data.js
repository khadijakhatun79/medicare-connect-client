const API = process.env.NEXT_PUBLIC_API_URL;

/* ================= ALL DOCTORS ================= */
export const fetchDoctors = async (search = "") => {
  try {
    const res = await fetch(
      `${API}/doctors?search=${search}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch doctors");
    }

    return await res.json();
  } catch (error) {
    console.log("fetchDoctors error:", error);
    return [];
  }
};

/* ================= APPOINTMENTS ================= */
export const fetchAppointments = async (email = "") => {
  try {
    const res = await fetch(
      `${API}/appointments?email=${email}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch appointments");
    }

    return await res.json();
  } catch (error) {
    console.log("fetchAppointments error:", error);
    return [];
  }
};

/* ================= FEATURED DOCTORS ================= */
export const fetchFeaturedAppointment = async () => {
  try {
    const res = await fetch(
      `${API}/featured-doctors`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch featured doctors");
    }

    return await res.json();
  } catch (error) {
    console.log("fetchFeaturedAppointment error:", error);
    return [];
  }
};

/* ================= DOCTOR DETAILS ================= */
export const fetchDoctorDetails = async (id) => {
  try {
    const res = await fetch(
      `${API}/doctors/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch doctor details");
    }

    return await res.json();
  } catch (error) {
    console.log("fetchDoctorDetails error:", error);
    return null;
  }
};