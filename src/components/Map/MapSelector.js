import React from 'react';
import { MAP_LIST } from 'src/utils/mapConstants';

const MapSelector = (props) => {
  return (
    <div style={{ width: '20%', height: '20%', display: 'flex' }}>
      {MAP_LIST.map((map) => (
        <button key={map.value} onClick={() => props.onClickMap(map.value)}>
          {map.kr_name}
        </button>
      ))}
    </div>
  );
};

export default MapSelector;
