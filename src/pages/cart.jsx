import React, { useContext } from 'react'
import {Helmet} from 'react-helmet'

import { CartContext } from '../context/CartContext';
import { Button } from 'antd'
import { Link } from 'react-router-dom';

export default function Cart() {
  const { orders, setOrders } = useContext(CartContext);
  const subtotal = orders.reduce((val, item) => (item.totalprice + val), 0)

  function handleCount(type, productId) {
    const index = orders.findIndex(item => item.id === productId)
    let temp = orders



    if (type === '+') {
      temp[index] = {
        ...temp[index],
        count: temp[index].count + 1,
        totalprice: (temp[index].count + 1) * temp[index].price
      }
    } else {
      temp[index] = {
        ...temp[index],
        count: temp[index].count - 1,
        totalprice: (temp[index].count - 1) * temp[index].price
      }
    }
    if (temp[index].totalprice <= 0) {
      temp = orders.filter(item => item.id !== productId)
      console.log('first')
      setOrders([...temp])
      return
    }
    setOrders([...temp])
  }

  return (
    <div className='flex flex-col gap-5'>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      {orders?.length > 0 ?
        orders.map((item, index) => (
          <div className='flex space-x-3 bg-white px-5 py-2 items-center shadow-sm transition duration-200 ease-in-out hover:shadow-md' key={index}>
            <div className='bg-transparent rounded-sm shadow-sm '>
              <Link to={`/#${item.id}`}>
                <img src={item.img} alt="" className='h-40 w-48 rounded-sm object-contain' />
              </Link>
            </div>
            <div className='border w-full h-full flex justify-between px-3'>
              <div>
                <p className='text-xl font-semibold'>Product: {item.name}</p>
                <p>Order ID: {item.id}</p>
                <p className='font-semibold text-[1rem]'>Price: {item.price} <span className='text-xl'> &times;</span> {item.count}</p>
              </div>
              <div className='text-lg font-semibold flex flex-col justify-center items-center'>
                {/* <p>Count: {item.count}</p> */}
                <p>Total: ${item.totalprice}</p>
                <div className='flex space-x-2'>
                  <Button shape='round' danger onClick={() => handleCount('-', item.id)}>-</Button>
                  <Button shape='round'  onClick={() => handleCount('+', item.id)}>+</Button>
                </div>
              </div>
            </div>
          </div>
        ))
        :
        <p>Cart is empty... <Link to='/'>add some product </Link> to your cart. </p>
      }
      <div className='w-full flex justify-end bg-white rounded-sm shadow-sm items-center h-12 py-3'>
        <p className='text-lg font-bold mx-5 my-3 text-center'>Sub total: <span className='text-xl ml-5'>${subtotal}</span></p>
      </div>
      <div className='flex w-full justify-between'>
          <Button onClick={() => { setOrders([]) }} danger>Clear Cart</Button>
        <Link to='/checkout'>
        <Button type='primary' disabled={orders.length <= 0}>Checkout</Button>
        </Link>
      </div>
    </div>
  )
}
