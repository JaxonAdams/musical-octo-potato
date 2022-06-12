import './App.css';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import DayPage from './pages/DayPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/calendar' element={<Home />} />
        <Route path='/day/:month/:day' element={<DayPage />} />
        <Route path='*' element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
