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
          <button>
            <Link to={'/boss'}>boss</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/quest'}>quest</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/ballistics'}>ballistics</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/hideout'}>hideout</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/item/ammo'}>ammo</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/item/vest'}>vest</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/item/rigs'}>rigs</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/item/container'}>container</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/item/headset'}>headset</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/item/head-wear'}>head-wear</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/item/medical'}>medical</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to={'/item/weapon'}>weapon</Link>
          </button>
        </li>
      </ul>
      <MapView key={map.NAME} mapInfo={map} />
    </div>
  );
};

export default Map;
