"use client";

import React from "react";
import { ImageKitProvider } from "imagekitio-next";
import { imgKitEndPoint, imgKitPublicKey } from "@/lib/constant";

export const ImgKitProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageKitProvider urlEndpoint={imgKitEndPoint} publicKey={imgKitPublicKey}>
      {children}
    </ImageKitProvider>
  );
};
