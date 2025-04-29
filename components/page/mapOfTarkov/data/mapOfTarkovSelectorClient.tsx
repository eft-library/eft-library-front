"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import type {
  MapOfTarkovSelectorClient,
  MapOfTarkovType,
} from "./mapOfTarkovType";
import { useEffect, useState } from "react";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import Loading from "@/components/custom/loading/loading";

export default function MapOfTarkovSelectorClient({
  setImageSelect,
  imageSelect,
}: MapOfTarkovSelectorClient) {
  const param = useParams<{ id: string }>();
  const [motType, setMotType] = useState<MapOfTarkovType>();

  useEffect(() => {
    const getSubMapById = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_DYNAMIC_INFO}/${COLUMN_KEY.mapOfTarkov}`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch sub map data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setMotType(data.data);
    };

    getSubMapById();
  }, [param.id]);

  if (!motType) return <Loading />;

  const sortList = () => {
    const result = motType.json_value.sort((a, b) => {
      return a.order - b.order;
    });
    return result;
  };

  const getSub = () => {
    const result = motType.json_value.find((mot) => mot.id === param.id);
    return result;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full flex-wrap rounded-t-lg border-solid border-2 border-white p-1">
        {sortList().map((mapOfTarkov) => (
          <div key={mapOfTarkov.id}>
            <Link
              href={mapOfTarkov.link}
              className={cn(
                "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
                { "bg-CloudGray": param.id === mapOfTarkov.id },
                { "text-Background": param.id === mapOfTarkov.id }
              )}
            >
              <span className="text-center font-bold">
                {mapOfTarkov.name_kr}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-wrap rounded-b-lg border-solid border-2 border-t-0 border-white p-1 gap-1">
        {getSub()?.image_list.map((sub) => (
          <div
            key={`image-${sub.id}`}
            onClick={() => setImageSelect(sub.id)}
            className={cn(
              "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
              { "bg-DeepSlate": imageSelect === sub.id }
            )}
          >
            <span className="text-center font-bold">{sub.name_kr}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
