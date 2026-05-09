import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/lib/tmdb";
import type { Media } from "@/types/media";

type PreviewsProps = {
  medias?: Media[];
};

export default function Previews({ medias = [] }: PreviewsProps) {
  return (
    <section className="px-4 py-3">
      <h2 className="text-heading2 text-white mb-3 antialiased">Previews</h2>
      <div className="flex gap-x-3 overflow-x-auto scrollbar-hide">
        {medias.map((media) => {
          const mediaType = media.media_type 
            ? (media.media_type === "tv" ? "tv" : "movie")
            : (media.name ? "tv" : "movie");

          return (
            <Link key={media.id} href={`/detail/${media.id}?type=${mediaType}`} className="shrink-0">
              <div className="relative w-25.5 h-25.5 rounded-full overflow-hidden bg-zinc-700">
                {media.poster_path && (
                  <Image
                    src={getPosterUrl(media.poster_path)}
                    alt={media.title ?? media.name ?? ""}
                    fill
                    sizes="102px"
                    className="object-cover"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
