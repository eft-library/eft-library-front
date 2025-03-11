"use client";

import { formatImage } from "@/lib/func/formatImage";
import Image from "next/image";
import Link from "next/link";
import { handleHover, handleHoverExit } from "@/lib/func/jsxfunction";
import type { NavItemList } from "../mainTypes";

export default function NavItemClient({ navItemList }: NavItemList) {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-5 gap-12">
        {navItemList.map((nav) => (
          <Link key={nav.value} href={nav.link} className="flex flex-col">
            <div
              className="relative flex justify-center items-center sursor-pointer rounded-lg bg-white border-white border-2 w-[120px] h-[120px]"
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverExit}
            >
              <Image
                src={formatImage(nav.image)}
                alt={nav.en_name}
                fill
                sizes="120px"
                className="rounded-lg object-cover"
                placeholder="blur"
                blurDataURL={
                  "data:image/jpeg;base64," +
                  "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                }
              />
            </div>
            <span className="text-white font-bold text-center mt-0.5">
              {nav.kr_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
