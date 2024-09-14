"use client";

import { IKImage } from "imagekitio-next";

type ImgProps = {
  alt: string;
  path: string;
  width: number;
  height: number;
};

const CustomImage = ({ path, width, height, alt }: ImgProps) => {
  return (
    <div className="relative">
      <IKImage
        path={path}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        lqip={{ active: true, quality: 20, blur: 20 }}
      />
    </div>
  );
};

export default CustomImage;
