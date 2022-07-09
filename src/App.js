


import './App.css';


//delete
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './components/login.jsx'
import Home from './components/home.jsx'

function App() {

  






  
  return (
    <div className="App">
     



    <Routes> 
      <Route path="/home" element={<Home/>} />
      <Route path="/" element={<Login/>} />
    </Routes>

     
    </div>



  

  );
}

export default App;
