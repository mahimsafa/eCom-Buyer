import React, { useContext, useState } from 'react'
import { Card, Button } from 'antd'
import { CartContext } from '../context/CartContext';
import {nanoid} from 'nanoid'

export default function ProductCard({ product }) {
    const [count, setCount] = useState(1)

    const { orders, setOrders } = useContext(CartContext);

    function handleCount(type) {
        type == '-' ? setCount(count - 1) : setCount(count + 1)
    }

    function handleOrder() {
        const payload = {
            // id:nanoid(10),
            // img:product.img,
            ...product,
            count: count,
            // price: product.price * count,
            totalprice: product.price * count,
        }
        setCount(1)

        let temp = orders

        function upsert(array, element) { // (1)
            const i = array.findIndex(_element => _element.id === element.id);
            if (i > -1) array[i] = element; // (2)
            else array = [...array, element];
            return array
        }

        temp = upsert(temp, payload)
        setOrders(temp)
    }

    return (
        <Card
        id={product.id}
            hoverable
            className='w-72  mb-10'
            cover={<img alt="example" src={product.img} className='h-52' />}
            actions={[
                <div className='flex justify-between items-center text-black px-2'>
                    <Button onClick={() => handleCount('-')}>-</Button>
                    <p className='h-8 w-10 bg-gray-200 p-1 mt-4 rounded-sm'>{count}</p>
                    <Button onClick={() => handleCount('+')}>+</Button>
                </div>,
                <Button className='mt-3' onClick={handleOrder}>Add To Cart</Button>,
            ]}
        >
            {/* <Card.Meta title={product.name} description={product.description}  /> */}
            <div>
                <div className='flex justify-between'>
                    <h1 className='text-[1rem]'>{product.name}</h1>
                    <h3 className='text-gray-500'>Price: {product.price}</h3>
                </div>
                <p className='text-sm'>{product.description}</p>
            </div>
        </Card>
    )
}
