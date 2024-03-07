import Image, { StaticImageData } from "next/image";

type Prevention = {
  name: string;
  image: StaticImageData;
};

export default function PreventionCard({
  prevention,
  reverse = false,
}: {
  prevention: Prevention;
  reverse?: boolean;
}) {
  return (
    <div className="card w-full max-w-96 bg-base-100 shadow-xl">
      {reverse ? (
        <div className="card-body">
          <Image src={prevention.image} alt={prevention.name} />
        </div>
      ) : (
        <div className="card-body">
          <Image src={prevention.image} alt={prevention.name} />
        </div>
      )}
    </div>
  );
}
