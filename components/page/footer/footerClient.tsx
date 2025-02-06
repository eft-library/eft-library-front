"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FooterSVG } from "../../custom/getIcon/getSVG";
import TextSpan from "../../custom/gridContents/textSpan";
import type { FooterData } from "./footerTypes";

export default function FooterClient({ footerData }: FooterData) {
  return (
    <div className="bg-cover bg-Background bg-center flex flex-col items-center justify-center w-full h-auto pt-10">
      <div className="grid grid-cols-4 gap-16">
        <div className="col-span-3">
          <div className="flex flex-col justify-center">
            <div className="flex m-1">
              <TextSpan
                isCursor
                textColor="SunsetYellow"
                hoverColor="CreamYellow"
              >
                <Link
                  href="https://eftlibrary.com/privacy-policy-kr"
                  target="_blank"
                >
                  개인정보처리방침&nbsp;
                </Link>
              </TextSpan>

              <TextSpan
                isCursor
                textColor="SunsetYellow"
                hoverColor="CreamYellow"
              >
                <Link
                  href="https://eftlibrary.com/privacy-policy-en"
                  target="_blank"
                >
                  (Privacy Policy), &nbsp;
                </Link>
              </TextSpan>

              <TextSpan
                isCursor
                textColor="SunsetYellow"
                hoverColor="CreamYellow"
              >
                <Link href="https://eftlibrary.com/terms" target="_blank">
                  이용 약관
                </Link>
              </TextSpan>
            </div>
            {footerData.json_value.text.map((item) => (
              <span key={item.value} className="text-white m-1 font-bold">
                {item.value}
              </span>
            ))}
            <div className="flex m-1">
              <TextSpan
                isCursor
                textColor="SunsetYellow"
                hoverColor="CreamYellow"
              >
                <Link href="https://eftlibrary.com/" target="_blank">
                  EFT Library
                </Link>
              </TextSpan>
              <TextSpan isCenter={false}>
                &nbsp;by&nbsp;TKL&nbsp;is licensed under&nbsp;
              </TextSpan>
              <TextSpan
                isCursor
                textColor="SunsetYellow"
                hoverColor="CreamYellow"
              >
                <Link
                  href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
                  target="_blank"
                  rel="license noopener noreferrer"
                >
                  CC BY-NC-ND 4.0
                </Link>
              </TextSpan>
            </div>
            <Link
              href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
              target="_blank"
              rel="license noopener noreferrer"
              style={{ display: "inline-block", width: "146px" }}
            >
              <Image
                src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png"
                alt="ND"
                priority
                width={142}
                height={50}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col m-1">
            <span className="text-white m-1 font-bold">
              Team TKL - HJ, SY, JY
            </span>
            <div className="flex">
              {footerData.json_value.icon.map((item, index) => {
                return (
                  <div
                    key={item.name}
                    className={cn("cursor-pointer", { "ml-4": index !== 0 })}
                    onClick={() => window.open(item.link, "_blank")}
                  >
                    <FooterSVG svgValue={item.name} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
