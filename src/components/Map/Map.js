import React, { useState } from 'react';
import MapView from 'src/components/Map/MapView';
import { MAP_INFO } from 'src/utils/mapConstants';
import MapSelector from 'src/components/Map/MapSelector';

const Map = () => {
  const [map, setMap] = useState(MAP_INFO.CUSTOM_GA_FIRST_FLOOR_DORMITORY);

  const onClickMap = (name) => {
    setMap(MAP_INFO[name]);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <MapSelector onClickMap={onClickMap} />
      <MapView key={map.NAME} mapInfo={map} />
    </div>
  );
};

export default Map;
