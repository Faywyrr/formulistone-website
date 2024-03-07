import { PartnersBanner } from "@/components/PartnersBanner";
import Image from "next/image";
import Presentation from "@/assets/presentation.png";

const YOUTUBE_TRAILER_ID = "jms4ALN0TNU";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center gap-4">
        <iframe
          className="sm:hidden"
          width="360"
          height="640"
          src={`http://www.youtube.com/embed/${YOUTUBE_TRAILER_ID}?autoplay=1&mute=1&controls=0&loop=1&showinfo=0&playlist=${YOUTUBE_TRAILER_ID}`}
        />
        <Image src={Presentation} alt="presentation" />
      </div>
      <PartnersBanner />
    </main>
  );
}
