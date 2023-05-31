
import './App.css';
import "./fonts/Nexa-Heavy.ttf";
import './fonts/Nexa-ExtraLight.ttf';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Projects from './pages/projects';
import ProjectData from './pages/projectData';
import Help from './pages/help';
import Landing from './pages/landing';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='landing' element={<Landing/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/projectData' element={<ProjectData/>}/>
        <Route path='/help' element={<Help/>}/>
      </Routes>
    </Router>
  );
}

export default App;
