import React, { useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import './App.css';

const containerStyle = {
  width: '400px',
  height: '400px',
};

function MyComponent() {
  const [libraries] = useState(['places']);
  const { isLoaded } = useLoadScript({
    // id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });
  const [center, setCenter] = useState({ lat: 43.45, lng: -80.49 });
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(5);
  const [address, setAddress] = useState('');

  const handleButtonClick = () => {
    const { lat, lng } = center;
    const newData = {
      lat,
      lng,
      address,
    };

    console.log(newData);
  };

  return isLoaded ? (
    <>
      <div className="places-container">
        <PlacesAutocomplete
          setSelected={setSelected}
          setCenter={setCenter}
          setZoom={setZoom}
          setAddress={setAddress}
        />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {selected && <Marker position={selected} />}
      </GoogleMap>
      <button onClick={handleButtonClick}>제출하기</button>
    </>
  ) : (
    <></>
  );
}

const PlacesAutocomplete = ({ setSelected, setCenter, setZoom, setAddress }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    console.log('address', address);
    setValue(address, false);
    setAddress(address);
    clearSuggestions();

    const results = await getGeocode({ address });
    console.log('results', results);
    const { lat, lng } = getLatLng(results[0]);
    // lat = lat.toFixed(5) / 1;
    // lng = lng.toFixed(5) / 1;
    console.log('lat', lat, 'lng', lng);
    setSelected({ lat, lng });
    setCenter({ lat, lng });
    setZoom(15);
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => {
              // console.log('data', data);
              return <ComboboxOption key={place_id} value={description} />;
            })}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
export default React.memo(MyComponent);
