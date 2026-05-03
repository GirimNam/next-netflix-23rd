"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb";
import type { Media } from "@/types/media";

type HeroBannerProps = {
  medias?: Media[];
};

export default function HeroBanner({ medias = [] }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (medias.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % medias.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [medias.length]);

  const media = medias[currentIndex];
  if (!media) return <div className="relative h-103.75 w-full bg-zinc-800" />;

  const title = media.title ?? media.name ?? "";

  return (
    <div className="relative h-103.75 w-full bg-zinc-800">
      {media.poster_path && (
        <Image
          src={getPosterUrl(media.poster_path, "w780")}
          alt={title}
          fill
          sizes="375px"
          className="object-cover"
          priority
        />
      )}
      <Image
        src="/icons/icon-top10.svg"
        alt="TOP 10"
        width={15}
        height={15}
        className="absolute bottom-1 left-29.25 z-10"
      />
      <span className="absolute bottom-0.5 left-34.5 h-5 text-white text-center text-[13.723px] font-bold leading-5 tracking-[-0.041px] whitespace-nowrap z-10">
        #{currentIndex + 1} in Korea Today
      </span>
    </div>
  );
}
