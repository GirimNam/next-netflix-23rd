import Image from "next/image";

export default function BannerButtons() {
  return (
    <div className="mx-auto mt-3.5 flex w-64.5 h-11 items-center justify-center gap-11">
      <div className="flex flex-col items-center gap-0.5">
        <Image
          src="/icons/icon-plus.svg"
          alt="My List"
          width={24}
          height={24}
        />
        <span className="text-white text-caption1 text-center w-9.5 h-4">
          My List
        </span>
      </div>
      <button className="flex items-center justify-center gap-3 bg-Grey-5 px-6 py-2 rounded">
        <Image
          src="/icons/icon-play-filled.svg"
          alt="재생"
          width={18}
          height={16}
        />
        <span className="text-label1 text-black antialiased">Play</span>
      </button>
      <div className="flex flex-col items-center gap-0.5">
        <Image
          src="/icons/icon-info-circle.svg"
          alt="정보"
          width={24}
          height={24}
        />
        <span className="text-white text-caption1 text-center w-5 h-4">
          Info
        </span>
      </div>
    </div>
  );
}
