import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import './App.css';
import GmapExam from './GmapExam';
import MapChart from './MapChart';
import MyComponent from './MyComponent';
import Asia from './pages/Asia';
import Africa from './pages/Africa';
import Europe from './pages/Europe';
import NorthAmerica from './pages/NorthAmerica';
import Oceania from './pages/Oceania';
import SouthAmerica from './pages/SouthAmerica';
const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

const App = () => {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapChart />} />
          <Route path="/as" element={<Asia />} />
          <Route path="/af" element={<Africa />} />
          <Route path="/oc" element={<Oceania />} />
          <Route path="/eu" element={<Europe />} />
          <Route path="/na" element={<NorthAmerica />} />
          <Route path="/sa" element={<SouthAmerica />} />
        </Routes>
      </BrowserRouter> */}
      <MyComponent />
      {/* <GmapExam /> */}
    </>
  );
};

export default App;
