import { InformationBoardPage } from "@/features/information-board/components/information-board-page";
import { InformationDetailPage } from "@/features/information-board/components/information-detail-page";
import {
  getInformationBoard,
  getInformationDetail,
} from "@/features/information-board/api";
import {
  getInformationBoardPageCopy,
  type InformationBoardSlug,
} from "@/features/information-board/config";
import { getUserLocale } from "@/i18n/locale";

export async function InformationBoardRoute({
  slug,
  page,
}: {
  slug: InformationBoardSlug;
  page: number;
}) {
  const locale = await getUserLocale();
  const copy = getInformationBoardPageCopy(slug, locale);
  const board = await getInformationBoard(copy.informationType, page);

  return (
    <InformationBoardPage
      boardPath={copy.path}
      boardTitle={copy.titleLabel}
      boardDescription={copy.descriptionLabel}
      board={board}
      locale={locale}
      labels={{
        totalLabel: copy.totalLabel,
        pageLabel: copy.pageLabel,
        updatedAtLabel: copy.updatedAtLabel,
        noPostsLabel: copy.noPostsLabel,
        viewDetailLabel: copy.viewDetailLabel,
        previousLabel: copy.previousLabel,
        nextLabel: copy.nextLabel,
      }}
    />
  );
}

export async function InformationDetailRoute({
  slug,
  informationId,
}: {
  slug: InformationBoardSlug;
  informationId: string;
}) {
  const locale = await getUserLocale();
  const copy = getInformationBoardPageCopy(slug, locale);
  const detail = await getInformationDetail(copy.informationType, informationId);

  return (
    <InformationDetailPage
      boardPath={copy.path}
      boardTitle={copy.titleLabel}
      detail={detail}
      locale={locale}
      labels={{
        updatedAtLabel: copy.updatedAtLabel,
        latestPostsLabel: copy.latestPostsLabel,
        backToListLabel: copy.backToListLabel,
      }}
    />
  );
}
