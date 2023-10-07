
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from "./components/Layout/Layout.jsx"
import Home from "./components/Home/Home.jsx"
import Cart from "./components/Cart/Cart.jsx"
import Brands from "./components/Brands/Brands.jsx"
import Login from "./components/Login/Login.jsx"
import Register from './components/Register/Register.1';
import Categories from "./components/Categories/Categories.jsx"
import Notfound from "./components/Notfound/Notfound.jsx"
import UserContextProvider from './components/context/userContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './components/context/cartContext';
import  { Toaster } from 'react-hot-toast';
import Profile from './components/Profile/Profile';
import Address from './components/address/address';
import Orders from './components/orders/Orders.1';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Verificationcode from './components/verificationcode/Verificationcode.1';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Wishlist from './components/Wishlist/Wishlist';










  let router =  createBrowserRouter([
    { path:"/", element: <Layout/>, children:[
      {index:true,element: <ProtectedRoute><Home/></ProtectedRoute> },
      {path:"login",element:<Login/>},
      {path:"register",element:<Register/>},
      {path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"allorders",element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:"wishlist",element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
      {path:"address",element:<ProtectedRoute><Address/></ProtectedRoute>},
      {path:"profile",element:<ProtectedRoute><Profile/></ProtectedRoute>},
      {path:"forgetpassword",element:<ForgetPassword/>},
      {path:"verificationcode",element:<Verificationcode/>},
      {path:"resetpassword",element:<ResetPassword/>},
      {path:"productdetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"*",element:<Notfound/>},
    ]}
  ])

function App() {
  return <>
  <CartContextProvider>
    <UserContextProvider>


      <RouterProvider router={router}></RouterProvider>
   <Toaster></Toaster>
  
  </UserContextProvider>
  
  </CartContextProvider>
  
  
  
  </>
}

export default App;
