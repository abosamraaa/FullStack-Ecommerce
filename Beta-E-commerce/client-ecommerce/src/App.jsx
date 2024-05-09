import Login from './Pages/Login'
import Home from './Pages/Home'
import Header from './Components/Header'
import Footer from './Components/Footer'
import {AuthProvider} from './Components/Auth'
import { Route,Routes } from "react-router-dom"
import './App.css'
import './index.css'
import PageNotFound from './Pages/PageNotFound'
import ProductDetails from './Components/ProductDetails'
import PrivateRoute from './Components/PrivateRoute'
import AdminDashboard from './Pages/AdminDashboard'
import Registeration from './Components/Registeration'
import Profile from './Pages/Profile'
import Cart from './Components/Cart/Cart'
import BuyNow from './Components/Cart/BuyNow'
import UpdateProduct from './Components/UpdateProduct'
import CheckOut from './Components/CheckOut'
function App() {


  return (
    <>
    <AuthProvider>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Registeration/>}></Route>
      <Route path='/product/:productId' element={<ProductDetails/>}></Route>
      <Route path='*' element={<PageNotFound/>}></Route>
      <Route path='/404' element={<PageNotFound/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route element={<PrivateRoute/>}>
      <Route path='/dashboard/*' element = {<AdminDashboard/>} exact></Route>
      <Route path='/updateproduct/:productId' element={<UpdateProduct/>}></Route>
      </Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/buynow/:productId/:productName' element={<BuyNow/>}></Route>
      <Route path='/checkout' element={<CheckOut/>}></Route>
    </Routes>
    <Footer/>
    </AuthProvider>
    </>
  )
}

export default App;
