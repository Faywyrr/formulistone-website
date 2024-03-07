import Image, { StaticImageData } from "next/image";

type AlloProps = {
  title: string;
  description: string;
  data: {
    zone: string;
    numbers: string[];
  }[];
  image: StaticImageData;
};

export default function AlloCard({
  allo,
  reverse = false,
}: {
  allo: AlloProps;
  reverse?: boolean;
}) {
  const { title, description, data, image } = allo;

  const dataComponents = data.map((d, i) => {
    const { zone, numbers } = d;

    return (
      <div key={i} className="flex flex-col gap-1">
        <div className="badge badge-primary">{zone}</div>
        <div className="flex flex-row flex-wrap gap-1">
          {numbers.map((number, i) => {
            return (
              <a
                className="badge badge-secondary"
                href={`tel:${number}`}
                key={i}
              >
                {number}
              </a>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className="card w-full max-w-96 bg-base-100 shadow-xl">
      {reverse ? (
        <>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="flex flex-row flex-wrap gap-4">
              {dataComponents}
            </div>
          </div>
          <figure>
            <Image src={allo.image} alt={allo.title} />
          </figure>
        </>
      ) : (
        <>
          <figure>
            <Image src={allo.image} alt={allo.title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{allo.title}</h2>
            <p>{allo.description}</p>
            <div className="flex flex-row flex-wrap gap-4">
              {dataComponents}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
