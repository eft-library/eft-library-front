import React, { useState } from 'react';
import MapView from 'src/components/Map/MapView';
import { MAP_INFO } from 'src/utils/mapConstants';
import MapSelector from 'src/components/Map/MapSelector';
import { Link } from 'react-router-dom';

const Map = () => {
  const [map, setMap] = useState(MAP_INFO.CUSTOM_GA_FIRST_FLOOR_DORMITORY);

  const onClickMap = (name) => {
    setMap(MAP_INFO[name]);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <MapSelector onClickMap={onClickMap} />
      <ul>
        <li>
          <Link to={'/boss'}>boss</Link>
        </li>
        <li>
          <Link to={'/quest'}>quest</Link>
        </li>
        <li>
          <Link to={'/ballistics'}>ballistics</Link>
        </li>
        <li>
          <Link to={'/hideout'}>hideout</Link>
        </li>
        <li>
          <Link to={'/item/ammo'}>ammo</Link>
        </li>
        <li>
          <Link to={'/item/vest'}>vest</Link>
        </li>
        <li>
          <Link to={'/item/rigs'}>rigs</Link>
        </li>
        <li>
          <Link to={'/item/container'}>container</Link>
        </li>
        <li>
          <Link to={'/item/headset'}>headset</Link>
        </li>
        <li>
          <Link to={'/item/head-wear'}>head-wear</Link>
        </li>
        <li>
          <Link to={'/item/medical'}>medical</Link>
        </li>
        <li>
          <Link to={'/item/weapon'}>weapon</Link>
        </li>
      </ul>
      <MapView key={map.NAME} mapInfo={map} />
    </div>
  );
};

export default Map;
