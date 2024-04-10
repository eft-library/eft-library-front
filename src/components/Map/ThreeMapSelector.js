import React, { useState } from 'react';
import ThreeMap from 'src/components/Map/ThreeMap';
import { MAP_INFO, MAP_LIST } from 'src/utils/mapConstants';

const ThreeMapSelector = () => {
  const [map, setMap] = useState(MAP_INFO.CUSTOM_GA_FIRST_FLOOR_DORMITORY);

  const onClickMap = (name) => {
    setMap(MAP_INFO[name]);
    console.log(map);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <div style={{ width: '20%', height: '20%', display: 'flex' }}>
        {MAP_LIST.map((map) => (
          <button key={map.value} onClick={() => onClickMap(map.value)}>
            {map.kr_name}
          </button>
        ))}
      </div>
      <ThreeMap key={map.NAME} mapInfo={map} />
    </div>
  );
};

export default ThreeMapSelector;
