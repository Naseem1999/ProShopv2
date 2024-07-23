import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter
       ,createRoutesFromElements,
       Route,
       RouterProvider
} from 'react-router-dom'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import {Provider} from 'react-redux';
import Store from './Store';
import CartScreen from './Screens/cartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PrivateRoute from './Components/PrivateRoute'
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import ProfileScreen from './Screens/ProfileScreen';
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}></Route>
      <Route  path='/product/:id' element={<ProductScreen/>}></Route>
      <Route  path='/cart' element={<CartScreen/>}></Route>
      <Route path='/login' element={<LoginScreen/>}></Route>
      <Route path='/register' element={<RegisterScreen/>}></Route>

      <Route path='' element={<PrivateRoute/>}>
            <Route path='/shipping' element={<ShippingScreen/>}></Route>
            <Route path='/payment' element={<PaymentScreen/>}></Route>
            <Route path='/placeorder' element={<PlaceOrderScreen/>}></Route>
            <Route path='/order/:id' element={<OrderScreen/>}></Route>
            <Route path='/profile' element={<ProfileScreen/>}></Route>
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PayPalScriptProvider>
          <RouterProvider router={router}/> 
      </PayPalScriptProvider>
        </Provider>
  </React.StrictMode>
);


reportWebVitals();
