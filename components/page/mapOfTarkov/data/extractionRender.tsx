"use client";

import { formatImage } from "@/lib/func/formatImage";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";

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
    <DefineGrid cols="11" id={extractionInfo.id} pageId="extraction">
      <CenterContents colSpan="2">
        <ImageView
          src={formatImage(extractionInfo.image)}
          alt={extractionInfo.name}
          popWidth={1600}
          popHeight={900}
          size="240px"
          wrapWidth={240}
          wrapHeight={130}
        />
      </CenterContents>
      <CenterContents colSpan="2">
        <TextSpan>{extractionInfo.name}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>{extractionInfo.faction}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>{extractionInfo.always_available ? "✅" : "❌"}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>{extractionInfo.single_use ? "✅" : "❌"}</TextSpan>
      </CenterContents>
      <div className="flex justify-center flex-col items-center col-span-2 gap-8">
        {extractionInfo.requirements &&
        extractionInfo.requirements.length > 0 ? (
          extractionInfo.requirements.map((require, index) => (
            <CenterContents key={`${require.image}-${index}`} isCol>
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
              <TextSpan>{formatTextWithLineBreaks(require.desc)}</TextSpan>
            </CenterContents>
          ))
        ) : (
          <TextSpan>-</TextSpan>
        )}
      </div>
      <div className="flex justify-center flex-col items-center col-span-2 gap-8">
        {extractionInfo.tip && extractionInfo.tip.length > 0 ? (
          extractionInfo.tip.map((tip, index) => (
            <CenterContents key={`${tip.image}-${index}`} isCol>
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
              <TextSpan>{formatTextWithLineBreaks(tip.desc)}</TextSpan>
            </CenterContents>
          ))
        ) : (
          <TextSpan>-</TextSpan>
        )}
      </div>
    </DefineGrid>
  );
}
