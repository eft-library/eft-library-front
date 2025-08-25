import Link from "next/link";
import { footerData } from "@/lib/consts/columnConsts";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-[#1e2124]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          {/* Left: Copyright and License */}
          <div className="text-center md:text-left">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Maps © 2024-2025 TKL |{" "}
              <span className="text-orange-500 dark:text-orange-400">
                CC BY-NC-ND 4.0
              </span>
            </div>
            <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              The automated data API is sourced from tarkov.dev, with additional
              content by TKL. • Escape from Tarkov © Battlestate Games
            </div>
          </div>

          {/* Right: Contact and Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a
              href="mailto:tarkovlibrary@gmail.com"
              className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
            >
              tarkovlibrary@gmail.com
            </a>
            <div className="flex space-x-4">
              <Link
                href={footerData.info.privacyLink}
                scroll={false}
                target="_blank"
                className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href={footerData.info.termsLink}
                scroll={false}
                target="_blank"
                className="text-sm text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: Team and Social */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2 sm:space-y-0">
          <div className="text-xs text-center sm:text-left text-gray-600 dark:text-gray-400">
            Team TKL: HJ, SY, JY
          </div>
          <div className="flex justify-center sm:justify-end space-x-4">
            <Link
              href={footerData.manager.gitLink}
              scroll={false}
              target="_blank"
              className="text-xs text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
            >
              GitHub
            </Link>
            <Link
              href={footerData.manager.chzzkLink}
              scroll={false}
              target="_blank"
              className="text-xs text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
            >
              Chzzk
            </Link>
            <Link
              href={footerData.manager.discordLink}
              scroll={false}
              target="_blank"
              className="text-xs text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
            >
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
