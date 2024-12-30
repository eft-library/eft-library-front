import Image from "next/image";
import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";

export default function Home() {
  return (
    <ContentsWrapper>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/loading.gif"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Go to nextjs.org →
      </a>
    </ContentsWrapper>
  );
}
