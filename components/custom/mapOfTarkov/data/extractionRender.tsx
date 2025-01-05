"use client";

import { formatImage } from "@/lib/func/formatImage";
import ImageView from "../../imageView/imageView";

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
        <ImageView
          src={formatImage(extractionInfo.image)}
          alt={extractionInfo.name}
          popWidth={1600}
          popHeight={900}
          size="240px"
          wrapWidth={240}
          wrapHeight={130}
        />
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
                <ImageView
                  src={formatImage(require.image)}
                  alt={require.desc}
                  popWidth={1600}
                  popHeight={900}
                  size="240px"
                  wrapWidth={200}
                  wrapHeight={120}
                />
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
                <ImageView
                  src={formatImage(tip.image)}
                  alt={tip.desc}
                  popWidth={1600}
                  popHeight={900}
                  size="240px"
                  wrapWidth={200}
                  wrapHeight={120}
                />
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
