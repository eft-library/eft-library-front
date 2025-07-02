import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetPatchNotesDetail from "@/components/page/patchNotesDetail/data/getPatchNotesDetail";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { information18N } from "@/lib/consts/i18nConsts";

export default function PatchNotesDetail() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {information18N.patchNotes.title[localeKey]}
      </h1>
      <GetPatchNotesDetail />
    </ContentsWrapper>
  );
}
