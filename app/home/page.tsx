import { Suspense } from "react";
import BannerButtons from "@/components/BannerButtons";
import BottomNav from "@/components/BottomNav";
import ContinueWatching from "@/components/ContinueWatching";
import HeroBanner from "@/components/HeroBanner";
import HomeHeader from "@/components/HomeHeader";
import MovieRow from "@/components/MovieRow";
import Previews from "@/components/Previews";
import {
  fetchAfricanMovies,
  fetchKoreaTopMovies,
  fetchNetflixOriginals,
  fetchNowPlaying,
  fetchPopular,
  fetchTopRated,
  fetchTrendingWeek,
  fetchTVThrillers,
  fetchUSTVShows,
} from "@/lib/tmdb";
import type { TMDBListResponse } from "@/types/media";

// --- 스켈레톤 UI ---
function HeroSkeleton() {
  return <div className="w-full h-[415px] bg-neutral-900 animate-pulse" />;
}

function RowSkeleton({ large }: { large?: boolean }) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="w-32 h-6 bg-neutral-800 rounded animate-pulse ml-4" />
      <div className="flex gap-[7px] overflow-hidden pl-3">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`${large ? "w-[154px] h-[251px]" : "w-[103px] h-[161px]"} bg-neutral-800 rounded-[2px] shrink-0 animate-pulse`} 
          />
        ))}
      </div>
    </div>
  );
}

// --- 섹션별 비동기 래퍼 컴포넌트 ---
async function AsyncHeroBanner() {
  const koreaTop = await fetchKoreaTopMovies();
  return <HeroBanner medias={koreaTop.results.slice(0, 10)} />;
}

async function AsyncPreviews() {
  const trending = await fetchTrendingWeek();
  return <Previews medias={trending.results.slice(0, 10)} />;
}

async function AsyncContinueWatching() {
  const popular = await fetchPopular();
  return <ContinueWatching medias={popular.results.slice(0, 10)} />;
}

async function AsyncMovieRow({ 
  title, 
  fetcher, 
  large, 
  slice 
}: { 
  title: string; 
  fetcher: () => Promise<TMDBListResponse>; 
  large?: boolean; 
  slice?: number; 
}) {
  const data = await fetcher();
  const medias = slice ? data.results.slice(0, slice) : data.results;
  return <MovieRow title={title} medias={medias} large={large} />;
}

// --- 메인 페이지 (즉시 렌더링 시작) ---
export default function HomePage() {
  return (
    <main className="pb-20">
      <HomeHeader />
      
      <Suspense fallback={<HeroSkeleton />}>
        <AsyncHeroBanner />
      </Suspense>
      
      <BannerButtons />
      
      <Suspense fallback={<RowSkeleton />}>
        <AsyncPreviews />
      </Suspense>
      
      <Suspense fallback={<RowSkeleton />}>
        <AsyncContinueWatching />
      </Suspense>

      <div className="flex flex-col gap-6 mt-4">
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="Popular on Netflix" fetcher={fetchPopular} />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="Trending Now" fetcher={fetchTrendingWeek} />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="Top 10 in Korea Today" fetcher={fetchKoreaTopMovies} slice={10} />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="My List" fetcher={fetchTopRated} />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="African Movies" fetcher={fetchAfricanMovies} />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="Nollywood Movies & TV" fetcher={fetchAfricanMovies} />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton large />}>
          <AsyncMovieRow title="Netflix Originals" fetcher={fetchNetflixOriginals} large />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="Watch it Again" fetcher={fetchPopular} />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="New Releases" fetcher={fetchNowPlaying} />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="TV Thrillers & Mysteries" fetcher={fetchTVThrillers} />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <AsyncMovieRow title="US TV Shows" fetcher={fetchUSTVShows} />
        </Suspense>
      </div>

      <BottomNav />
    </main>
  );
}
