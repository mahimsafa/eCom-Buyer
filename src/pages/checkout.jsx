import { useState, useContext, useEffect } from 'react'
import {Helmet} from 'react-helmet'

import { CartContext } from '../context/CartContext';
import { useNavigate, Navigate } from 'react-router-dom'
import { Input, Form, Button, Space, notification } from 'antd'
import { useAuthenticator } from '@aws-amplify/ui-react';
import { HOST } from '../config'


export default function Checkout() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  if (!user) return <Navigate to='/auth' replace />


  const [userState, setUserState] = useState({})
  const [email, setEmail] = useState('')
  const { orders, setOrders } = useContext(CartContext);
  const navigate = useNavigate()

  function handleChange(e) {
    setUserState({ ...userState, [e.target.name]: e.target.value })
  }


  async function handleSubmit() {
    const payload = {
      price: orders.reduce((val, item) => (item.totalprice + val), 0),
      products: orders,
      customer: {
        ...userState,
        userId: user.username, email: userState.email ?? user?.signInUserSession?.idToken.payload.email
      }
    }
    let res = await fetch(`${HOST}/orders`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    res = await res.json()
    if (res.$metadata.httpStatusCode === 200) {
      setUserState({ userId: user.username })
      setOrders([])
      notification.success({
        message: 'Success',
        description:
          `You have successfully ordered ${orders.length} products. Total product quantity ${orders.reduce((val, item) => (item.count + val), 0)} and total price is ${payload.price}`,
      });
      setTimeout(() => navigate('/'), 5000)
    } else {
      notification.error({
        message: 'Error',
        description:
          `Something went wrong. Please contact site owner.`,
      });
    }
  }

  return (
    <div className='bg-white p-2 shadow-sm border border-red-300 w-full'>
      <div
        className='w-2/3 mx-auto'
      >
        <Helmet>
          Checkout
        </Helmet>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <input autoComplete="false" name="hidden" type="text" className='hidden'></input>
          <Form.Item
            label="Name"
            name='name'
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input onChange={handleChange} type='text' autoComplete='false' name='name' />
          </Form.Item>

          <Form.Item
            label="Email"
            name='email'
            rules={[{ required: false }]}
          >
            <Input type='email' onChange={handleChange} name='email' />
          </Form.Item>
          <Form.Item
            label="Phone"
            name='phone'
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input onChange={handleChange} name='phone' />
          </Form.Item>
          <Form.Item
            label="Delivery Address"
            name='address'
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input.TextArea style={{ resize: 'none', height: 90 }} onChange={handleChange} name='address' />
          </Form.Item>
          <Form.Item
            label="Credit card no."
            name='card'
            rules={[{ required: true, message:'Please inpute your credit card number.' }]}
          >
            <Input type='text' onChange={handleChange} name='card' />
          </Form.Item>
          <Form.Item
            label="Expiry"
            name='expiry'
            rules={[{ required: true, message:'Please inpute expiry date.' }]}
          >
            <Input type='text' onChange={handleChange} name='expiry' />
          </Form.Item>
          <Form.Item
            label="CVV"
            name='cvv'
            rules={[{ required: true, message:'Please inpute cvv number.' }]}
          >
            <Input type='text' onChange={handleChange} name='cvv' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8 }}>
            <Space>
              <Button onClick={() => navigate('/cart')} >
                Back To Cart
              </Button>
              <Button type="primary" htmlType="submit" >
                Confirm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
