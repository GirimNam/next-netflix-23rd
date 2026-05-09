import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/lib/tmdb";
import type { Media } from "@/types/media";

type MovieCardProps = {
  media?: Media;
  large?: boolean;
};

export default function MovieCard({ media, large }: MovieCardProps) {
  const sizeClass = large
    ? "w-[154.04px] h-[251px]"
    : "w-[103px] h-[161px]";

  if (!media?.poster_path) {
    return <div className={`${sizeClass} rounded-[2px] bg-white shrink-0`} />;
  }

  const title = media.title ?? media.name ?? "";
  const imageSize = large ? "w342" : "w185";
  
  // media_type이 명시되어 있으면 그걸 쓰고, 없으면 name(TV) 속성 유무로 판별
  const mediaType = media.media_type 
    ? (media.media_type === "tv" ? "tv" : "movie")
    : (media.name ? "tv" : "movie");

  return (
    <Link href={`/detail/${media.id}?type=${mediaType}`}>
      <div className={`${sizeClass} rounded-[2px] overflow-hidden shrink-0 relative`}>
        <Image
          src={getPosterUrl(media.poster_path, imageSize)}
          alt={title}
          fill
          sizes={large ? "154px" : "103px"}
          className="object-cover"
        />
      </div>
    </Link>
  );
}

