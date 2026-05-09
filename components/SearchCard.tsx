import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/lib/tmdb";
import type { Media } from "@/types/media";

type SearchCardProps = {
  media?: Media;
  large?: boolean;
  skeleton?: boolean;
};

export default function SearchCard({ media, skeleton }: SearchCardProps) {
  if (skeleton) {
    return (
      <div className="flex flex-row h-19 skeleton-item">
        <div className="w-36.5 h-19 shrink-0 bg-zinc-700" />
        <div className="flex flex-1 flex-row items-center justify-between bg-Grey-800 px-4">
          <div className="h-4 w-32 bg-zinc-700 rounded" />
          <div className="w-6 h-6 bg-zinc-700 rounded-full" />
        </div>
      </div>
    );
  }

  if (!media?.poster_path) {
    return <div className="rounded-xs bg-white shrink-0" />;
  }

  const title = media.title ?? media.name ?? "";
  const type = media.media_type === "tv" ? "tv" : "movie";

  return (
    <Link href={`/detail/${media.id}?type=${type}`} className="flex flex-row h-19">
      <div className="relative w-36.5 h-19 shrink-0 overflow-hidden">
        <Image
          src={getPosterUrl(media.poster_path)}
          alt={title}
          fill
          sizes="146px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-row items-center justify-between bg-Grey-800 px-4">
        <span className="text-white text-body2">{title}</span>
        <Image
          src="/icons/icon-play-circle.svg"
          alt="재생 버튼"
          width={24}
          height={24}
        />
      </div>
    </Link>
  );
}
