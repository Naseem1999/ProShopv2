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

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}></Route>
      <Route  path='/product/:id' element={<ProductScreen/>}></Route>
      <Route  path='/cart' element={<CartScreen/>}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
          <RouterProvider router={router}/> 
   </Provider>
  </React.StrictMode>
);


reportWebVitals();
