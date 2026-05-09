import BackButton from "@/components/BackButton";
import DetailHeroImage from "@/components/DetailHeroImage";
import DetailInfo from "@/components/DetailInfo";
import PlayButton from "@/components/PlayButton";
import { fetchMediaDetail } from "@/lib/tmdb";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
};

export default async function DetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { type } = await searchParams;
  const mediaType = type === "tv" ? "tv" : "movie";

  const media = await fetchMediaDetail(Number(id), mediaType);
  const title = media.title ?? media.name ?? "";

  return (
    <main className="bg-black min-h-screen pb-20">
      <div className="relative">
        <DetailHeroImage media={media} />
        <BackButton />
      </div>
      <PlayButton />
      <DetailInfo title={title} overview={media.overview} />
    </main>
  );
}
