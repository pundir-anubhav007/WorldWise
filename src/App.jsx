import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./Pages/Product"
import Homepage from "./Pages/Homepage"
import Pricing from "./Pages/Pricing"
import AppLayout from './Pages/AppLayout'
import Login from "./Pages/Login"
import PageNotFound from "./Pages/PageNotFound";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>LIST OF CITIES</p>} />
          <Route path="cities" element={<p>List of cities</p>} />
          <Route path="countries" element={<p>List of countries</p>} />
          <Route path="form" element={<p>Form Data </p>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App