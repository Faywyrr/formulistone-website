import SlotComponent from "@/components/SlotComponent";
import { getStrictUser } from "@/lib/auth";
import { CRENAUX } from "@/lib/reservation";
import { getSlots } from "@/lib/slot";

export default async function Reservation() {
  const user = await getStrictUser();
  const slots = await getSlots();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Réservation</h1>
      <p>Réservez vos crénaux pour le simulateur de F1</p>

      <div className="flex flex-row flex-wrap gap-4">
        {CRENAUX.map((creneau, i) => (
          <SlotComponent
            key={i}
            hour={creneau}
            claim={slots.some((slot) => slot.hour === creneau)}
            deletable={user.slots.some((slot) => slot.hour === creneau)}
          />
        ))}
      </div>
    </div>
  );
}
