import PreventionCard from "@/components/PreventionCard";
import Activites from "@/assets/prevention/activites.png";
/*import Alcool from "@/assets/prevention/alcool.png";
import Consentement from "@/assets/prevention/consentement.png";
import Dons from "@/assets/prevention/dons.png";
import Drogue from "@/assets/prevention/drogue.png";
import Goodies from "@/assets/prevention/goodies.png";
import IST from "@/assets/prevention/IST.png";
import MesureEvent from "@/assets/prevention/mesureevent.png";
import Pole from "@/assets/prevention/pole.png";
import PolyConsommation from "@/assets/prevention/polyconsommation.png";
import Routier from "@/assets/prevention/routier.png";
import Volume from "@/assets/prevention/volume.png";*/

export default async function Prevention() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Prévention</h1>
      <p>On ne rigole pas avec la sécurité</p>
      <p>Les autres affiches de prévention sont à venir</p>
      <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-x-60">
        <PreventionCard
          prevention={{
            name: "Activités",
            image: Activites,
          }}
        />

        {/*<PreventionCard
          prevention={{
            name: "Alcool",
            image: Alcool,
          }}
        />
        <PreventionCard
          prevention={{
            name: "Consentement",
            image: Consentement,
          }}
        />
        <PreventionCard prevention={{
            name: "Contacts",
            image: Contacts
        }} />
        <PreventionCard
          prevention={{
            name: "Dons",
            image: Dons,
          }}
        />
        <PreventionCard
          prevention={{
            name: "Drogue",
            image: Drogue,
          }}
        />
        <PreventionCard
          prevention={{
            name: "Goodies",
            image: Goodies,
          }}
        />
        <PreventionCard
          prevention={{
            name: "IST",
            image: IST,
          }}
        />
        <PreventionCard
          prevention={{
            name: "MesureEvent",
            image: MesureEvent,
          }}
        />
        <PreventionCard
          prevention={{
            name: "Pole",
            image: Pole,
          }}
        />
        <PreventionCard
          prevention={{
            name: "PolyConsommation",
            image: PolyConsommation,
          }}
        />
        <PreventionCard
          prevention={{
            name: "Routier",
            image: Routier,
          }}
        />
        <PreventionCard
          prevention={{
            name: "Volume",
            image: Volume,
          }}
        />*/}
      </div>
    </div>
  );
}
