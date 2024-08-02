import { useState } from "react";
import {Routes, Route} from 'react-router-dom'
import Createbook from "./Pages/Createbook";
import Editbook from "./Pages/Editbook";
import Showbook from "./Pages/Showbook";
import Deletebooks from "./Pages/Deletebooks";
import Home from "./Pages/Home";


function App() {
  return <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/books/show/:id" element={<Showbook/>}></Route>
            <Route path="/books/create/" element={<Createbook/>}></Route>
            <Route path="/books/edit/:id" element={<Editbook/>}></Route>
            <Route path="/books/delete/:id" element={<Deletebooks/>}></Route>
        </Routes>
}

export default App;
 