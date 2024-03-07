"use client";

import { Image as ImageProps } from "@/lib/google-drive";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import NextJsImageSlides from "./NextJsImageSlides";
import NextJsImageAlbum from "./NextJsImageAlbum";

export default function Photos({ images }: { images: ImageProps[] }) {
  const photos = images.map((image) => {
    const thumbnailWidth = image.imageMediaMetadata.width / 10;
    const thumbnailHeight =
      (image.imageMediaMetadata.height / image.imageMediaMetadata.width) *
      thumbnailWidth;

    return {
      src: image.thumbnailLink,
      width: thumbnailWidth,
      height: thumbnailHeight,
    };
  });

  const slides = images.map((image) => ({
    src: image.webContentLink,
    width: image.imageMediaMetadata.width,
    height: image.imageMediaMetadata.height,
  }));

  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="w-full">
        <PhotoAlbum
          layout="rows"
          photos={photos}
          targetRowHeight={200}
          renderPhoto={NextJsImageAlbum}
          onClick={({ index: current }) => setIndex(current)}
        />
      </div>

      <Lightbox
        render={{ slide: NextJsImageSlides }}
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
}
