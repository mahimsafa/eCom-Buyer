import { Carousel } from 'antd'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'

import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../lib/controllers'

export default function Home() {

  const { data, status } = useQuery('products', fetchProducts)
  if (status === 'loading') return <h1>Loding...</h1>
  if (status === 'error') return <h1>Error!</h1>

  return (
    <main className='flex flex-col space-y-5'>
      <Helmet>
        <title>eCommerce Shop</title>
      </Helmet>
      <section>
        <Carousel autoplay>
          <div className='h-80'>
            <img src="https://img.freepik.com/free-vector/stylish-yellow-red-black-friday-sale-memphis-style-banner_1017-34704.jpg?w=1380&t=st=1666112235~exp=1666112835~hmac=af21e757dbf55d9897450dc7425fb1bff5bf9a9d35d7536948b71a09bd64256c" alt="" className='object-contain' />
          </div>
          <div className='h-80'>
            <img src="https://img.freepik.com/free-vector/low-poly-abstract-banner-with-glowing-light-effect_1017-27111.jpg?w=1380&t=st=1666112277~exp=1666112877~hmac=eafdb428895c5adbf9a9b5703621679025492b71bb541331cecbbdff4f769d19" alt="" className='object-contain' />
          </div>
          <div className='h-80'>
            <img src="https://img.freepik.com/free-vector/transparent-golden-light-flare-sparkles-mega-set_1017-31896.jpg?w=1380&t=st=1666112291~exp=1666112891~hmac=352b11c4b5a79a9e3004a36000f114ba027a359007b3e08da9a92f9447c6bfaa" alt="" className='object-contain' />
          </div>
        </Carousel>
      </section>
      {/* <section className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-5'> */}
      <section className='w-full flex flex-wrap justify-between gap-6'>
        {data.Items.map((product, index) => (<ProductCard key={index} product={product} />))}
      </section>
    </main>
  )
}
