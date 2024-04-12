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
      <Link to={'/boss'}>item/bag</Link>
      <Link to={'/quest'}>item/bag</Link>
      <Link to={'/ballistics'}>item/bag</Link>
      <Link to={'/hideout'}>item/bag</Link>
      <Link to={'/item/ammo'}>item/bag</Link>
      <Link to={'/item/vest'}>item/bag</Link>
      <Link to={'/item/rigs'}>item/bag</Link>
      <Link to={'/item/container'}>item/bag</Link>
      <Link to={'/item/headset'}>item/bag</Link>
      <Link to={'/item/head-wear'}>item/bag</Link>
      <Link to={'/item/medical'}>item/bag</Link>
      <Link to={'/item/weapon'}>item/bag</Link>
      <MapView key={map.NAME} mapInfo={map} />
    </div>
  );
};

export default Map;
