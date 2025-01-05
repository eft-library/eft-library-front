"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { formatImage } from "@/lib/func/formatImage";

interface Requirement {
  desc: string;
  image: string;
  thumbnail: string;
}
interface Extraction {
  id: string;
  name: string;
  faction: string;
  single_use: boolean;
  tip: Requirement[];
  image: string;
  image_thumbnail: string;
  always_available: boolean;
  requirements: Requirement[];
  map: string;
}

interface ExtractionRender {
  extractionInfo: Extraction;
}

export default function ExtractionRender({ extractionInfo }: ExtractionRender) {
  const formatTextWithLineBreaks = (text: string) => {
    return text.split("\n").map((line) => (
      <span key={line}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="w-full grid grid-cols-11 gap-2 border-solid border-white border-2 rounded-lg p-3">
      <div className="flex justify-center items-center col-span-2">
        <Gallery>
          <Item
            original={formatImage(extractionInfo.image)}
            width="1600"
            height="900"
          >
            {({ ref, open }) => (
              <div
                ref={ref}
                onClick={open}
                className="relative w-[240px] h-[200px] cursor-pointer" // 부모 요소 크기 지정
              >
                <Image
                  src={formatImage(extractionInfo.image)}
                  alt={extractionInfo.name}
                  fill
                  sizes="240px"
                  style={{ objectFit: "contain" }} // 이미지 비율 유지
                  priority
                />
              </div>
            )}
          </Item>
        </Gallery>
      </div>
      <div className="flex justify-center items-center col-span-2">
        <span className="text-center font-bold text-base">
          {extractionInfo.name}
        </span>
      </div>
      <div className="flex justify-center items-center">
        <span className="text-center font-bold text-base">
          {extractionInfo.faction}
        </span>
      </div>
      <div className="flex justify-center items-center">
        <span className="text-center font-bold text-base">
          {extractionInfo.always_available ? "✅" : "❌"}
        </span>
      </div>
      <div className="flex justify-center items-center">
        <span className="text-center font-bold text-base">
          {extractionInfo.single_use ? "✅" : "❌"}
        </span>
      </div>
      <div className="flex justify-center flex-col items-center col-span-2 gap-8">
        {extractionInfo.requirements &&
        extractionInfo.requirements.length > 0 ? (
          extractionInfo.requirements.map((require, index) => (
            <div
              key={`${require.image}-${index}`}
              className="flex flex-col items-center"
            >
              {require.image && (
                <Gallery>
                  <Item
                    original={formatImage(require.image)}
                    width="1600"
                    height="900"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="relative w-[200px] h-[180px] cursor-pointer" // 부모 요소 크기 지정
                      >
                        <Image
                          src={formatImage(require.image)}
                          alt={require.desc}
                          fill
                          sizes="200px"
                          style={{ objectFit: "contain" }} // 이미지 비율 유지
                          priority
                        />
                      </div>
                    )}
                  </Item>
                </Gallery>
              )}
              <span className="text-center font-bold text-base">
                {formatTextWithLineBreaks(require.desc)}
              </span>
            </div>
          ))
        ) : (
          <span className="text-center font-bold text-base">-</span>
        )}
      </div>
      <div className="flex justify-center flex-col items-center col-span-2 gap-8">
        {extractionInfo.tip && extractionInfo.tip.length > 0 ? (
          extractionInfo.tip.map((tip, index) => (
            <div
              key={`${tip.image}-${index}`}
              className="flex flex-col items-center"
            >
              {tip.image && (
                <Gallery>
                  <Item
                    original={formatImage(tip.image)}
                    width="1600"
                    height="900"
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="relative w-[200px] h-[180px] cursor-pointer" // 부모 요소 크기 지정
                      >
                        <Image
                          src={formatImage(tip.image)}
                          alt={tip.desc}
                          fill
                          sizes="200px"
                          style={{ objectFit: "contain" }} // 이미지 비율 유지
                          priority
                        />
                      </div>
                    )}
                  </Item>
                </Gallery>
              )}
              <span className="text-center font-bold text-base">
                {formatTextWithLineBreaks(tip.desc)}
              </span>
            </div>
          ))
        ) : (
          <span className="text-center font-bold text-base">-</span>
        )}
      </div>
    </div>
  );
}
