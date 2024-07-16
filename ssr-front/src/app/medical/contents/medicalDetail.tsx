"use client";

import { Box } from "@chakra-ui/react";
import type { MedicalDetail, Medical } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import dynamic from "next/dynamic";

const MedicalMedikit = dynamic(() => import("./medicalRender/medicalMedikit"), {
  ssr: false,
});
const MedicalItem = dynamic(() => import("./medicalRender/medicalItem"), {
  ssr: false,
});
const MedicalDrug = dynamic(() => import("./medicalRender/medicalDrug"), {
  ssr: false,
});
const MedicalStimulant = dynamic(
  () => import("./medicalRender/medicalStimulant"),
  {
    ssr: false,
  }
);

export default function MedicalDetail({ category }: MedicalDetail) {
  const [medical, setMedical] = useState<Medical[]>(null);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_MEDICAL, setMedical);
  }, []);

  if (!medical) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <>
        {(category === "ALL" || category === "Drug") && (
          <>
            <MedicalDrug medicalList={medical} />
            {category === "ALL" && <Box mb={20} />}
          </>
        )}
        {(category === "ALL" || category === "Stimulant") && (
          <>
            <MedicalStimulant medicalList={medical} />
            {category === "ALL" && <Box mb={20} />}
          </>
        )}
        {(category === "ALL" || category === "Medical item") && (
          <>
            <MedicalItem medicalList={medical} />
            {category === "ALL" && <Box mb={20} />}
          </>
        )}
        {(category === "ALL" || category === "Medikit") && (
          <>
            <MedicalMedikit medicalList={medical} />
          </>
        )}
      </>
    </Box>
  );
}
