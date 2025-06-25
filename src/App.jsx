import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Home"
import Success from './Success'

function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}></Route> 
            <Route path='/success'element={<Success/>}></Route>
        </Routes>
   </BrowserRouter>

  )
}

export default App