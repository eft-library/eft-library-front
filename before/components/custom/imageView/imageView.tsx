import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";

interface ImageView {
  src: string;
  alt: string;
  popHeight: number;
  popWidth: number;
  wrapWidth: number;
  wrapHeight: number;
  size: string;
}

export default function ImageView({
  src,
  alt,
  popHeight,
  popWidth,
  size,
  wrapWidth,
  wrapHeight,
}: ImageView) {
  return (
    <div
      style={{
        width: `${wrapWidth}px`,
        height: `${wrapHeight}px`,
      }}
      className={`flex justify-center items-center relative cursor-pointer`}
    >
      <Gallery>
        <Item original={src} width={popWidth} height={popHeight}>
          {({ ref, open }) => (
            <Image
              ref={ref}
              onClick={open}
              src={src}
              fill
              sizes={size}
              style={{ objectFit: "contain" }}
              alt={alt}
              priority
              placeholder="blur"
              blurDataURL={
                "data:image/jpeg;base64," +
                "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              }
            />
          )}
        </Item>
      </Gallery>
    </div>
  );
}
