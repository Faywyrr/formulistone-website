import AlloCard from "@/components/AlloCard";
import CarWash from "@/assets/allos/carwash.jpg";
import Cuisine from "@/assets/allos/cuisine.jpg";
import Courses from "@/assets/allos/courses.jpg";
import Sandwich from "@/assets/allos/sandwich.jpg";
import Glouglou from "@/assets/allos/glouglou.png";
import Roses from "@/assets/allos/roses.jpg";
import Assistance from "@/assets/allos/assistance.jpg";
import AlloSecret from "@/components/AlloSecret";

export default function Allos() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Allos</h1>
      <p>Des services gratuits pour vous aider</p>

      <div className="flex flex-row flex-wrap justify-center gap-x-64 gap-y-12">
        <AlloCard
          reverse
          allo={{
            title: "Allos CarWash",
            description: "Nous lavons votre voiture sur demande",
            image: CarWash,
            data: [
              {
                zone: "Dolines",
                numbers: [],
              },
              {
                zone: "Newton",
                numbers: [],
              },
              {
                zone: "Calades / Magister	",
                numbers: [],
              },
              {
                zone: "Antibes",
                numbers: [],
              },
            ],
          }}
        />

        <AlloCard
          allo={{
            title: "Allos Cuisine",
            description: "Nous cuisinons pour vous",
            image: Cuisine,
            data: [
              {
                zone: "Dolines",
                numbers: [],
              },
              {
                zone: "Newton",
                numbers: [],
              },
              {
                zone: "Calades / Magister",
                numbers: [],
              },
              {
                zone: "Thesa / Oxford",
                numbers: [],
              },
              {
                zone: "Antibes",
                numbers: [],
              },
            ],
          }}
          reverse
        />

        <AlloCard
          allo={{
            title: "Allos Courses / Taxi",
            description:
              "Nous vous emmenons faire vos courses ou nous vous déposons où vous voulez (dans la limite du raisonnable)",
            image: Courses,
            data: [
              {
                zone: "Dolines",
                numbers: [],
              },
              {
                zone: "Newton",
                numbers: [],
              },
              {
                zone: "Calades / Magister",
                numbers: [],
              },
              {
                zone: "Thesa / Oxford",
                numbers: [],
              },
              {
                zone: "Antibes",
                numbers: [],
              },
            ],
          }}
        />

        <AlloCard
          allo={{
            title: "Allos Sandwich",
            description: "Nous vous préparons un bet de sandwich 👀",
            image: Sandwich,
            data: [
              {
                zone: "Dolines",
                numbers: [],
              },
              {
                zone: "Antibes",
                numbers: [],
              },
            ],
          }}
          reverse
        />

        <AlloCard
          allo={{
            title: "Allos Glouglou",
            description:
              "Nous vous apportons des boissons et nous trinquerons ensemble",
            image: Glouglou,
            data: [
              {
                zone: "Dolines",
                numbers: [],
              },
              {
                zone: "Calades / Magister",
                numbers: [],
              },
              {
                zone: "Thesa / Oxford",
                numbers: [],
              },
              {
                zone: "Antibes",
                numbers: [],
              },
            ],
          }}
        />

        <AlloCard
          allo={{
            title: "Allos Rose",
            description: "Nous sommes là pour vous divertir",
            image: Roses,
            data: [
              {
                zone: "Dolines",
                numbers: [],
              },
              {
                zone: "Newton",
                numbers: [],
              },
              {
                zone: "Calades / Magister",
                numbers: [],
              },
            ],
          }}
          reverse
        />

        <AlloCard
          allo={{
            title: "Allos Assistance",
            description:
              "Nous vous aidons dans vos problèmes physiques ou psychologiques",
            image: Assistance,
            data: [
              {
                zone: "Dolines",
                numbers: [],
              },
            ],
          }}
        />
      </div>

      <AlloSecret />
    </div>
  );
}
