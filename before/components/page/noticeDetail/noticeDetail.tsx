import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetNoticeDetail from "@/components/page/noticeDetail/data/getNoticeDetail";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { information18N } from "@/lib/consts/i18nConsts";

export default function NoticeDetail() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {information18N.notice.title[localeKey]}
      </h1>
      <GetNoticeDetail />
    </ContentsWrapper>
  );
}
