import {useEffect, useState} from "react";
import * as THREE from "three";
import {LineBasicMaterial} from "three";
import {Collada, ColladaLoader,} from "three/examples/jsm/loaders/ColladaLoader.js";
import {ALL_COLOR} from "@/lib/consts/colorConsts";
import {formatImage} from "@/lib/func/formatImage";

interface ColladaData {
  colladaData: Collada;
}

export const useLoadMap = (map_three_path: string) => {
  const [map, setMap] = useState<ColladaData | null>(null);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const loadedColladaData = await new Promise<Collada>(
          (resolve, reject) => {
            const loader = new ColladaLoader();
            loader.load(
              formatImage(map_three_path),
              (collada) => resolve(collada),
              undefined,
              (error) => reject(error)
            );
          }
        );

        // 모델의 모든 자식 노드를 반복하여 선을 입력값으로 설정
        loadedColladaData.scene.traverse((child) => {
          if ((child as THREE.Line).isLine) {
            // 선의 재질을 설정
            (child as THREE.Line).material = new LineBasicMaterial({
              color: ALL_COLOR.MAP_BLACK,
            });
          }
        });
        // 상태를 업데이트
        setMap({ colladaData: loadedColladaData });
      } catch (e) {
        console.log(e);
      }
    };

    if (map_three_path !== null) {
      loadMapData();
    }
  }, [map_three_path]);
  return map;
};
