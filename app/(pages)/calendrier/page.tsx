import Image from "next/image";
import PlanningLandscape from "@/assets/planning_landscape.svg";
import PlanningPortrait from "@/assets/planning_portrait.svg";

export default function Calendar() {
  return (
    <div className="size-full">
      <Image
        src={PlanningLandscape}
        className="hidden sm:block"
        alt="Planning"
      />
      <Image src={PlanningPortrait} className="sm:hidden" alt="Planning" />
    </div>
  );
}
