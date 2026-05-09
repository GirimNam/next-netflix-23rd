type DetailInfoProps = {
  title: string;
  overview: string;
};

export default function DetailInfo({ title, overview }: DetailInfoProps) {
  return (
    <div className="mt-8 flex flex-col gap-[12px]">
      <span
        style={{
          marginLeft: "34px",
          color: "#FFF",
          fontFamily: "Pretendard",
          fontSize: "24px",
          fontWeight: 600,
          lineHeight: "135%",
          letterSpacing: "-0.48px",
        }}
      >
        {title}
      </span>
      <span
        style={{
          marginLeft: "28px",
          width: "320px",
          color: "#FFF",
          fontFamily: "Pretendard",
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "135%",
          letterSpacing: "-0.24px",
        }}
      >
        {overview}
      </span>
    </div>
  );
}
