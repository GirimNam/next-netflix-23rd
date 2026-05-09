import Image from "next/image";

export default function PlayButton() {
  return (
    <div className="flex justify-center mt-3">
      <button className="flex items-center justify-center gap-[13px] w-[302px] h-[44px] rounded-[4px] bg-[#C4C4C4]">
        <Image
          src="/icons/icon-play-filled.svg"
          alt="play"
          width={14}
          height={16}
        />
        <span
          style={{
            color: "#000",
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: "135%",
            letterSpacing: "-0.4px",
          }}
        >
          Play
        </span>
      </button>
    </div>
  );
}
