import Add from './Add';
import './App.css';
import {Inventory} from './Inventory.js';
import Update from './Update'
import Delete from './Delete'
import Check from './Check'
import Start from './Start.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/board"  element={<Start />}></Route>
        <Route path="/board/:page_num/:pages/:start"  element={<Inventory />}></Route>
        <Route path="/board/add" element={<Add/>}></Route>
        <Route path='/board/update/:id' element={<Update />}> </Route>
        <Route path='/board/delete/:id' element={<Delete />}></Route>
        <Route path='/board/check/:id' element={<Check />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
