import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Navbarhome from "./components/navbar/navbar.js";
import HomePage from './components/home/home.js';


function App() {
  return (
    <Router>
     <Navbarhome/>
     <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/Home" element={<HomePage/>} />

        <Route path="/Home" element={<Navigate to="/Home" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;