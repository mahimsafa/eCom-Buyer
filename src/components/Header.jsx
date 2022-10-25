import { Link } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Badge, Button } from 'antd'
import { useAuthenticator } from '@aws-amplify/ui-react';
import { UserOutlined } from '@ant-design/icons'

import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

export default function Header() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { orders } = useContext(CartContext);
  return (
    <div className='flex bg-white space-x-2 min-h-[60px] py-3 shadow-sm sticky top-0 z-50 w-screen'>
      <div className='w-8/12 flex justify-between mx-auto items-center'>
        <Link to='/'>
          <img src="https://www.seekpng.com/png/full/428-4289671_logo-e-commerce-good-e-commerce-logo.png" alt=""
            className='h-10'
          />
        </Link>
        <div
          className='flex space-x-3 items-center'
        >
          {user ?
            <p>Logged in as: <span className='text-red-400'> {user?.signInUserSession?.idToken.payload.email}</span></p>
            :
            <Link to='/auth'>
              <div
                className='flex items-center space-x-2 text-black justify-center transition-all duration-200 ease-in-out hover:text-blue-400'>
                <UserOutlined twoToneColor='#eb2f96' />
                <p className='text-center my-auto'>  Auth</p>
              </div>
            </Link>
          }
        </div>
        <div className='flex space-x-4 items-center'>
          {user &&
            <Button danger size='small' onClick={signOut} >Sign Out</Button>
          }
          <Link to='/cart'>
            <Badge count={orders?.length}>
              <ShoppingCartIcon className='cursor-pointer text-black h-7 w-7 transition duration-150 ease-in-out hover:text-blue-400' />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  )
}
