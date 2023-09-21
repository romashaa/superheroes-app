import './App.css';
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SuperheroDetailsPage from "./pages/SuperheroDetailsPage";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path="/superheroDetails/:id" element={<SuperheroDetailsPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
