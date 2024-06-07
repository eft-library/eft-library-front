import { MutableRefObject } from "react";

interface OrbitControl {
  // OrbitControl의 속성 및 메서드에 대한 타입 정의
  reset: () => void; // 예시: reset 메서드의 시그니처
  // 다른 속성 및 메서드 추가 가능
}

/**
 * OrbitControl의 시점을 초기화하여 반환하는 함수
 */
export const useOrbitReset = (
  orbitRef: MutableRefObject<OrbitControl | null>
) => {
  return orbitRef.current?.reset();
};
