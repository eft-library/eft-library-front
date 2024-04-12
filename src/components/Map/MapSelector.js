import React from 'react';
import { MAP_LIST } from 'src/utils/mapConstants';

const MapSelector = (props) => {
  return (
    <div style={{ width: '20%', height: '20%', display: 'flex' }}>
      <ul>
        {MAP_LIST.map((map) => (
          <li key={map.value} onClick={() => props.onClickMap(map.value)}>
            <button>{map.kr_name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapSelector;
