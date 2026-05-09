import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/lib/tmdb";
import type { Media } from "@/types/media";

type ContinueWatchingProps = {
  medias?: Media[];
};

const PROGRESS_PATTERN = [40, 70, 20, 55, 85, 30, 60, 15];

export default function ContinueWatching({ medias = [] }: ContinueWatchingProps) {
  return (
    <section className="px-4 py-3">
      <h2 className="text-heading2 text-white mb-3 antialiased">
        Continue Watching for Girim Nam
      </h2>
      <div className="flex gap-x-3 overflow-x-auto scrollbar-hide">
        {medias.map((media, index) => {
          const progress = PROGRESS_PATTERN[index % PROGRESS_PATTERN.length];
          const mediaType = media.media_type 
            ? (media.media_type === "tv" ? "tv" : "movie")
            : (media.name ? "tv" : "movie");

          return (
            <Link
              key={media.id}
              href={`/detail/${media.id}?type=${mediaType}`}
              className="shrink-0"
            >
              <div className="relative w-30 h-44 rounded-sm overflow-hidden bg-zinc-700">
                {media.poster_path && (
                  <Image
                    src={getPosterUrl(media.poster_path, "w342")}
                    alt={media.title ?? media.name ?? ""}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-600">
                  <div
                    className="h-full bg-red-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
