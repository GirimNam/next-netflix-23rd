"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    icon: "/icons/icon-home.svg",
    activeIcon: "/icons/icon-home-filled.svg",
    label: "Home",
    href: "/home",
  },
  {
    icon: "/icons/icon-search.svg",
    activeIcon: "/icons/icon-search-filled.svg",
    label: "Search",
    href: "/search",
  },
  {
    icon: "/icons/icon-comingsoon.svg",
    activeIcon: "/icons/icon-comingsoon.svg",
    label: "Coming Soon",
    href: "/loading",
    disableActive: true,
  },
  {
    icon: "/icons/icon-downloads.svg",
    activeIcon: "/icons/icon-downloads.svg",
    label: "Downloads",
    href: "/loading",
    disableActive: true,
  },
  {
    icon: "/icons/icon-more.svg",
    activeIcon: "/icons/icon-more.svg",
    label: "More",
    href: "/loading",
    disableActive: true,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 flex flex-col w-93.75 bg-black">
      <div className="flex h-14 px-6 justify-between items-center">
        {NAV_ITEMS.map(({ icon, activeIcon, label, href, disableActive }) => {
          const isActive = !disableActive && pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center gap-1 text-[8px] ${isActive ? "text-white" : "text-Grey-700"}`}
            >
              <Image
                src={isActive ? activeIcon : icon}
                alt={label}
                width={18}
                height={18}
              />
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
