"use client";

import Image from "next/image";
import type { InventoryGrid } from "../priceTypes";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function InventoryGrid({ topList }: InventoryGrid) {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {topList.map((topImage) => (
        <Image
          key={topImage.id}
          src={topImage.item_image}
          alt={topImage.item_name_en}
          sizes={(topImage.width * 64).toString()}
          width={topImage.width * 64}
          height={topImage.height * 64}
          style={{ display: "block" }}
        />
      ))}
    </Masonry>
  );
}
