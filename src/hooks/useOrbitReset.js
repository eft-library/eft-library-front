/**
 * OrbitControl의 시점을 초기화하여 반환하는 함수
 */
export const useOrbitReset = (orbitRef) => {
  return orbitRef.current.reset();
};
