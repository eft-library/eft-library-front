"use client";

import Link from "next/link";
import Image from "next/image";
import TextSpan from "../../custom/gridContents/textSpan";
import { footerData } from "@/lib/consts/columnConsts";

export default function Footer() {
  return (
    <div className="flex flex-col max-w-[1300px] pt-2 mx-[16%] bg-Background justify-center">
      <div className="flex flex-col w-full gap-[2px]">
        {footerData.text.map((desc, index) => (
          <TextSpan isCenter={false} key={`footerText-${index}`}>
            {desc}
          </TextSpan>
        ))}
        <div className="flex">
          <Link href={footerData.info.privacyLink}>
            <TextSpan
              hoverColor="GoldenYellow"
              textColor="CreamYellow"
              isCenter={false}
            >
              🔗 Privacy
            </TextSpan>
          </Link>
          <TextSpan isCenter={false}>&nbsp;|&nbsp;</TextSpan>
          <Link href={footerData.info.termsLink}>
            <TextSpan
              hoverColor="GoldenYellow"
              textColor="CreamYellow"
              isCenter={false}
            >
              Terms
            </TextSpan>
          </Link>
        </div>
        <div className="flex">
          <TextSpan isCenter={false}>
            👨‍💻 Team TKL : HJ, SY, JY | 🌐&nbsp;
          </TextSpan>
          <Link href={footerData.manager.gitLink}>
            <TextSpan
              hoverColor="GoldenYellow"
              textColor="CreamYellow"
              isCenter={false}
            >
              GitHub
            </TextSpan>
          </Link>
          <TextSpan isCenter={false}>&nbsp;·&nbsp;</TextSpan>
          <Link href={footerData.manager.chzzkLink}>
            <TextSpan
              hoverColor="GoldenYellow"
              textColor="CreamYellow"
              isCenter={false}
            >
              Chzzk
            </TextSpan>
          </Link>
          <TextSpan isCenter={false}>&nbsp;·&nbsp;</TextSpan>
          <Link href={footerData.manager.discordLink}>
            <TextSpan
              hoverColor="GoldenYellow"
              textColor="CreamYellow"
              isCenter={false}
            >
              Discord
            </TextSpan>
          </Link>
        </div>
        <div className="flex">
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
              placeholder="blur"
              blurDataURL={
                "data:image/jpeg;base64," +
                "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
