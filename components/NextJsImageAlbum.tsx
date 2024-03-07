import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";

export default function NextJsImageAlbum({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div style={wrapperStyle} className="relative">
      <Image fill src={photo} {...{ alt, title, sizes, className, onClick }} />
    </div>
  );
}
