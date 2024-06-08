import { MutableRefObject } from "react";
import { type OrbitControl } from "@/types/types";

/**
 * OrbitControl의 시점을 초기화하여 반환하는 함수
 */
export const useOrbitReset = (
  orbitRef: MutableRefObject<OrbitControl | null>
) => {
  return orbitRef.current?.reset();
};
