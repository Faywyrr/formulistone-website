import CampaignCard from "@/components/CampaignCard";
import Federp from "@/assets/promises/polytech-federp.png";
import Polytech from "@/assets/promises/polytech.jpg";
import Mobile from "@/assets/promises/mobile.jpg";
import Association from "@/assets/promises/association.png";

export default function Campagne() {
  return (
    <div className="flex flex-col items-center gap-x-16 gap-y-6">
      <h1 className="text-center text-4xl font-bold">Promesse de campagne</h1>

      <div className="flex flex-row flex-wrap justify-center gap-x-64 gap-y-12">
        <CampaignCard
          campaign={{
            title: "Event Réseau",
            description:
              "Travailler en collaboration avec la ville de Biot et la commune de Sophia pour proposer à nouveau un événement réseau chaque année. Des pour parler et des réunions sont déjà en cours. Il est temps de renouer avec le réseau !",
            image: Federp,
          }}
        />
        <CampaignCard
          reverse
          campaign={{
            title: "Des associations plus indépendantes",
            description:
              "Accompagner les clubs qui souhaitent devenir des associations indépendantes dans leurs démarches administratives et leur plan de viabilité financière. Le BDE de Polytech Nice Sophia continuera toujours à faire caissonner les étudiants de Polytech NSA, il n’a rien à envier aux autres associations, il se doit de les accompagner et de les soutenir.",
            image: Association,
          }}
        />
        <CampaignCard
          campaign={{
            title: "Renforcer les liens avec l’administration de Polytech",
            description:
              "Mettre en place une table ronde pour comprendre comment le BDE et PNS peuvent travailler dynamiquement et plus efficacement.",
            image: Polytech,
          }}
        />
        <CampaignCard
          reverse
          campaign={{
            title: "Une Application pour tous",
            description:
              "Créer une application dédiée aux membres et adhérents du BDE, et plus largement aux nouveaux élèves de Polytech. Une application qui centralisera tous les services du BDE.",
            image: Mobile,
          }}
        />
      </div>
    </div>
  );
}
