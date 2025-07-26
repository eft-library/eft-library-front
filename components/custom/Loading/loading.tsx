import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { loadingI18N } from "@/lib/consts/i18nConsts";

export default function Loading() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm" />

      {/* 스피너 컨테이너 */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 border border-gray-200 dark:border-gray-700">
        {/* 스피너 */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            {/* 외부 회전하는 원 */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-orange-200 dark:border-orange-300/30 border-t-orange-500 dark:border-t-orange-400 rounded-full animate-spin"></div>

            {/* 내부 펄스 효과 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 dark:bg-orange-500 rounded-full animate-pulse"></div>
            </div>

            {/* 추가 장식 점들 */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 dark:bg-orange-400 rounded-full animate-bounce"></div>
            <div
              className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-400 dark:bg-orange-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          {/* 로딩 텍스트 */}
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {loadingI18N.loading[localeKey]}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {loadingI18N.pleaseWait[localeKey]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
