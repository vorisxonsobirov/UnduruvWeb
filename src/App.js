import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Bar from './components/Bar/Bar';
import Profile from './components/Profile/Profile';
import Xabarlar from './components/Xabarlar/Xabarlar';
import Tulovlar from './components/Tulovlar/Tulovlar';
import Kontragentlar from './components/Kontragent/Kontragent';
import KursValyut from './components/KursValyut/KursValyut';
import Map from './components/Map/Map';
import { useState } from 'react';

function App() {
  const [isBarOpen, setIsBarOpen] = useState(false);

  const toggleBar = () => {
    setIsBarOpen(!isBarOpen);
  };

  return (
    <div className="App">
            <Navbar/> 
      <div className="main-layout">
        <Bar/>
  
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/KursValyut" element={<KursValyut />} />
            <Route path="/Xabarlar" element={<Xabarlar />} />
            <Route path="/Tulovlar" element={<Tulovlar />} />
            <Route path="/Kontragentlar" element={<Kontragentlar />} />
            {/* <Route path="/Map" element={<Map />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
