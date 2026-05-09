"use client";

import Image from "next/image";
import { useState } from "react";
import { searchAction } from "@/app/search/actions";
import type { Media } from "@/types/media";

type SearchHeaderProps = {
  onResults: (results: Media[], loading: boolean) => void;
};

export default function SearchHeader({ onResults }: SearchHeaderProps) {
  const [query, setQuery] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    if (!q.trim()) {
      onResults([], false);
      return;
    }
    onResults([], true);
    try {
      const data = await searchAction(q);
      onResults(data.results ?? [], false);
    } catch {
      onResults([], false);
    }
  };

  return (
    <header className="fixed top-11 z-10 w-93.75 flex flex-row items-center h-13 bg-Grey-800 px-4 gap-3">
      <Image
        src="/icons/icon-search-header.svg"
        alt="돋보기"
        width={20}
        height={20}
      />
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search for a show, movie, genre, e.t.c."
        className="flex-1 bg-transparent text-white text-body2 placeholder:text-Grey-600 placeholder:text-label2 outline-none border-none focus:ring-0"
      />
      <Image src="/icons/icon-x.svg" alt="x" width={16} height={16} />
    </header>
  );
}
