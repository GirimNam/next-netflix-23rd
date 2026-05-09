"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeFilledIcon from "@/components/icons/HomeFilledIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import ComingSoonIcon from "@/components/icons/ComingSoonIcon";
import DownloadsIcon from "@/components/icons/DownloadsIcon";
import MoreIcon from "@/components/icons/MoreIcon";

const NAV_ITEMS = [
  { Icon: HomeFilledIcon, label: "Home", href: "/home" },
  { Icon: SearchIcon, label: "Search", href: "/search" },
  {
    Icon: ComingSoonIcon,
    label: "Coming Soon",
    href: "/comingSoon",
  },
  { Icon: DownloadsIcon, label: "Downloads", href: "/downloads" },
  { Icon: MoreIcon, label: "More", href: "/more" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 flex flex-col w-93.75 bg-black">
      <div className="flex h-14 px-6 justify-between items-center">
        {NAV_ITEMS.map(({ Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 text-[8px] ${isActive ? "text-white" : "text-Grey-700"}`}
            >
              <Icon width={18} height={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center pb-2 mt-4">
        <div className="w-30 h-1 bg-white rounded-full" />
      </div>
    </nav>
  );
}
