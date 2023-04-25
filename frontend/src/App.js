import { Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Mainpage } from './pages/mainpage';
import { Loginpage } from './pages/loginpage';
import { Notfoundpage } from './pages/notfoundpage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/loginpage" element={<Loginpage />} />
      <Route path="*" element={<Notfoundpage />} />
    </Routes>
    </>
  );
}

export default App;
