import { apiGet } from "@/lib/api/api-client";
import type {
  InformationDetailResponse,
  InformationListResponse,
  InformationType,
} from "@/types/api/news";

function buildInformationListPath(
  informationType: InformationType,
  page: number,
  pageSize: number,
) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
    info_type: informationType,
  });

  return `/api/news/v3/information/board?${params.toString()}`;
}

function buildInformationDetailPath(
  informationType: InformationType,
  informationId: string,
) {
  return `/api/news/v3/information/${informationType}/detail/${informationId}`;
}

export function getInformationBoard(
  informationType: InformationType,
  page: number,
  pageSize = 10,
) {
  return apiGet<InformationListResponse>(
    buildInformationListPath(informationType, page, pageSize),
    { revalidate: 60 * 10 },
  );
}

export function getInformationDetail(
  informationType: InformationType,
  informationId: string,
) {
  return apiGet<InformationDetailResponse>(
    buildInformationDetailPath(informationType, informationId),
    { revalidate: 60 * 10 },
  );
}
