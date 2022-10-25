import React, { useState, useMemo, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'


import './index.css'
import 'antd/dist/antd.css';
import '@aws-amplify/ui-react/styles.css';


import App from './App'
import Cart from './pages/cart'
import Checkout from './pages/checkout';
import Home from './pages';
import { CartContext } from './context/CartContext'
import Login from './pages/login';

const queryClient = new QueryClient()

function Main() {
  const [orders, setOrders] = useState([]);
  const value = useMemo(
    () => ({ orders, setOrders }),
    [orders]
  );

  return (
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App><Home /></App>} />
            <Route path='auth' element={<App><Login /></App>} />
            <Route path='cart' element={<App><Cart /></App>} />
            <Route path='checkout' element={<App><Checkout /></App>} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </QueryClientProvider>
    // </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
