import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';

const MapChart = () => {
  const navigate = useNavigate();
  const geoUrl =
    'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

  const handleMarkerClick = (code) => {
    console.log(code);
    navigate(`/${code}`);
  };

  const [markers, setMarkers] = useState([
    // { markerOffset: 15, name: '뉴욕, 미국', coordinates: [-73.1551, 43.8013] },
    { markerOffset: 15, name: 'North America', coordinates: [-100.1551, 48.801], code: 'na' },
    // {
    //   markerOffset: 15,
    //   name: '밴쿠버, 캐나다',
    //   coordinates: [-115.1551, 55.801],
    // },
    {
      markerOffset: 15,
      name: 'South America',
      coordinates: [-56.0721, -10.711],
      code: 'sa',
    },
    // { markerOffset: 15, name: '런던, 영국', coordinates: [0.1551, 60.8013] },
    {
      markerOffset: 15,
      name: 'Europe',
      coordinates: [14.1551, 55],
      code: 'eu',
    },
    // {
    //   markerOffset: 15,
    //   name: '모스크바, 러시아',
    //   coordinates: [35.1551, 60],
    // },
    {
      markerOffset: 15,
      name: 'Africa',
      coordinates: [20.1551, 7],
      code: 'af',
    },
    {
      markerOffset: 15,
      name: 'Asia',
      coordinates: [90.59, 40.33],
      code: 'as',
    },
    {
      markerOffset: 15,
      name: 'Oceania',
      coordinates: [136.59, -25.33],
      code: 'oc',
    },
    // { markerOffset: 15, name: '서울, 한국', coordinates: [126.59, 37.33] },
  ]);

  const mapMarker = markers.map(({ name, coordinates, markerOffset, code }) => (
    <Marker key={name} coordinates={coordinates} onClick={() => handleMarkerClick(code)}>
      <g
        fill="none"
        stroke="#FF5533"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(-22, -34)"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 50 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="bubblerect"
            stroke="white"
            d="M0 7C0 3.13401 3.13401 0 7 0H33C36.866 0 40 3.13401 40 7V33C40 36.866 36.866 40 33 40H7C3.13401 40 0 36.866 0 33V7Z"
            fill="white"
          />
          <path
            stroke="white"
            d="M20.8742 42.4265C20.4932 40.1123 22.5068 43.1123 19.1258 40.4265L15.8254 33.4856C15.4551 32.8191 15.937 35 16.6995 35H23.3005C24.063 35 24.5449 35.8191 24.1746 36.4856L20.8742 42.4265Z"
            fill="white"
          />
          <path />
        </svg>
        <g style={{ objectFit: 'cover' }}></g>
      </g>
      <text
        textAnchor="middle"
        y={markerOffset}
        style={{
          fontFamily: 'NanumSquareRound',
          fill: 'white',
          fontSize: '10px',
        }}
      >
        {name}
      </text>
    </Marker>
  ));

  return (
    <ComposableMap
      className="composableMap"
      projection="geoEquirectangular"
      projectionConfig={{ scale: 150 }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              name={geo.properties}
              onClick={(e) => {
                const { name, POP_EST } = geo.properties;
              }}
              style={{
                default: {
                  fill: '#324047',
                  outline: 'none',
                },
                hover: {
                  fill: 'rgb(238, 222, 207)',
                  outline: 'none',
                },
                pressed: {
                  fill: '#E42',
                  outline: 'none',
                },
              }}
            />
          ))
        }
      </Geographies>
      {mapMarker}
    </ComposableMap>
  );
};

export default MapChart;
