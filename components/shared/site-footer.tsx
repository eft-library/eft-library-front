import Link from "next/link";

const footerLinks = {
  privacy: "/privacy-policy",
  terms: "/terms",
  github: "https://github.com/eft-library",
  chzzk: "https://chzzk.naver.com/9f015658fd7b36976be2e849ac14f197",
  discord: "https://discord.gg/U39nmwB4ba",
};

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-[#1e2124]">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Maps © 2024-2026 TKL |{" "}
              <span className="text-orange-500 dark:text-orange-400">
                CC BY-NC-ND 4.0
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              The automated data API is sourced from tarkov.dev, with additional
              content by TKL. • Escape from Tarkov © Battlestate Games
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            <a
              href="mailto:tarkovlibrary@gmail.com"
              className="text-sm text-gray-600 transition-colors hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
            >
              tarkovlibrary@gmail.com
            </a>
            <div className="flex gap-4">
              <FooterLink href={footerLinks.privacy}>Privacy</FooterLink>
              <FooterLink href={footerLinks.terms}>Terms</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center text-xs text-gray-600 dark:text-gray-400 sm:text-left">
            Team TKL: HJ, SY, JY
          </div>
          <div className="flex justify-center gap-4 sm:justify-end">
            <FooterLink href={footerLinks.github} external>
              GitHub
            </FooterLink>
            <FooterLink href={footerLinks.chzzk} external>
              Chzzk
            </FooterLink>
            <FooterLink href={footerLinks.discord} external>
              Discord
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="text-xs text-gray-600 transition-colors hover:text-orange-500 sm:text-sm dark:text-gray-400 dark:hover:text-orange-400"
    >
      {children}
    </Link>
  );
}
