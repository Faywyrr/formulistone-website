import { listImages } from "@/lib/google-drive";
import Photos from "@/components/Photos";

export default async function PhotosPage() {
  const images = await listImages();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Photos</h1>
      <p>Voici les photos de nos événements</p>

      <Photos images={images} />
    </div>
  );
}
