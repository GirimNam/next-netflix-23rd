"use client";

import { useState, useEffect, useRef } from "react";
import SearchCard from "@/components/SearchCard";
import BottomNav from "@/components/BottomNav";
import SearchHeader from "@/components/SearchHeader";
import { fetchTopSearches } from "./actions";
import type { Media } from "@/types/media";

export default function SearchPage() {
  const [topSearches, setTopSearches] = useState<Media[]>([]);
  const [results, setResults] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTopSearches(1).then((data) => {
      setTopSearches(data.results);
      setHasMore(data.page < data.total_pages);
    });
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, results]);

  useEffect(() => {
    if (page === 1 || results.length > 0) return;
    fetchTopSearches(page).then((data) => {
      setTopSearches((prev) => [...prev, ...data.results]);
      setHasMore(data.page < data.total_pages);
    });
  }, [page]);

  const handleResults = (newResults: Media[], loading: boolean) => {
    setResults(newResults);
    setIsLoading(loading);
  };

  const displayList = results.length > 0 ? results : topSearches;

  return (
    <main className="flex flex-col pb-20 pt-24">
      <SearchHeader onResults={handleResults} />
      <h2 className="text-heading1 text-white px-4 py-3.5">Top Searches</h2>
      <div className="flex flex-col gap-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SearchCard key={i} skeleton />
            ))
          : displayList.map((media) => (
              <SearchCard key={media.id} media={media} />
            ))}
      </div>
      {hasMore && results.length === 0 && <div ref={sentinelRef} className="h-1" />}
      <BottomNav />
    </main>
  );
}
