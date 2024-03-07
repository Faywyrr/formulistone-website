import Image, { StaticImageData } from "next/image";

type Campaign = {
  title: string;
  description: string;
  image: StaticImageData;
};

export default function CampaignCard({
  campaign,
  reverse = false,
}: {
  campaign: Campaign;
  reverse?: boolean;
}) {
  return (
    <div className="card w-full max-w-96 bg-base-100 shadow-xl">
      {reverse ? (
        <>
          <div className="card-body">
            <h2 className="card-title">{campaign.title}</h2>
            <p>{campaign.description}</p>
          </div>
          <figure>
            <Image src={campaign.image} alt={campaign.title} />
          </figure>
        </>
      ) : (
        <>
          <figure>
            <Image src={campaign.image} alt={campaign.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{campaign.title}</h2>
            <p>{campaign.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
