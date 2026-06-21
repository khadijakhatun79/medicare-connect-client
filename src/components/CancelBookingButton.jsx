"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CancelBookingButton({ id }) {
  const router = useRouter();

  const handleCancel = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data?.deletedCount > 0) {
        toast.success("Appointment cancelled successfully!");
        router.refresh(); // refresh dashboard UI
      } else {
        toast.error("Failed to cancel appointment");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Button
        color="danger"
        variant="light"
        size="sm"
      >
        Cancel
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-96">

            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Cancel Appointment
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-slate-600">
                Are you sure you want to cancel this appointment?
                This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>

              <Button
                slot="close"
                variant="light"
              >
                Keep Appointment
              </Button>

              <Button
                color="danger"
                className="font-bold"
                onPress={handleCancel}
              >
                Yes, Cancel
              </Button>

            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}