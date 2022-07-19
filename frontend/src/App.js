import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Articles from './Pages/Articles';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/articles' element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
