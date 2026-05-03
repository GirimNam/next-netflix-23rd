import Image from "next/image";

export default function HomeHeader() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-93.75 h-14.25 flex items-center justify-center gap-[24.666px] pl-4 pr-[25.1px] z-10">
      <Image
        src="/icons/icon-Netflix.svg"
        alt="Netflix"
        width={56}
        height={57}
      />
      <span className="text-white text-body1 text-center shrink-0 w-[84.464px]">
        TV Shows
      </span>
      <span className="text-white text-body1 text-center shrink-0 w-[59.873px]">
        Movies
      </span>
      <span className="text-white text-body1 text-center shrink-0 w-[60.942px]">
        My List
      </span>
    </header>
  );
}
