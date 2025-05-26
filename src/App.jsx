import './App.css'
import CreateProduct from './Components/CreateProduct'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import FilterData from './Components/FilterData'
import ProductDetail from './Components/ProductDetail'
import UpdateProduct from './Components/UpdateProduct'
import DeleteProduct from './Components/DeleteProduct'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FilterData />}></Route>
          <Route path="/CreateProduct" element={<CreateProduct />}></Route>
          <Route path="/ProductDetail/:id" element={<ProductDetail />}></Route>
          <Route path="/UpdateProduct/:id" element={<UpdateProduct />}></Route>
          <Route path="/DeleteProduct/:id" element={<DeleteProduct />}></Route>



        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
