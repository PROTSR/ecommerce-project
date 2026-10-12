import React, { useContext } from 'react'
import Herosec from './Herosec'
import { ArrowRight, SlashSquare } from 'lucide-react'
import Cart from '../smallcomp/Cart'
import Saleban from '../smallcomp/Saleban'
import Prodcart from '../smallcomp/Prodcart'
import Footer from './Footer'
import { useState } from 'react'
import { ThemData } from '../../contex/Theme'

const Home = () => {
  const {productData,categories}=useContext(ThemData)
  

  return (
    <section className='w-full  '>


      <div className=' flex flex-col pl-20 bg-[url(https://img.magnific.com/free-photo/stunning-barefooted-woman-trendy-fur-coat-dancing-laughing-photoshoot_197531-7073.jpg?semt=ais_hybrid&w=740&q=80)] bg-no-repeat bg-cover h-159 justify-center items-start gap-4'>
        <h1 className='text-6xl font-bold text-gray-600'>Where Fashion <br /> Meets Freedom</h1>
        <h3 className='text-gray-50 w-80'>Get ready to turn heads with clothing that speaks louder than words</h3>

        <button className='flex items-center text-md text-black bg-purple-700 gap-2 p-2 rounded-full'>
          Shop Now <ArrowRight size={25} className='' />
        </button>
      </div>
      {/* categories */}

      <div className='mt-4 flex flex-col justify-center items-center gap-4 mb-4'>
        <h3 className='font-bold'>FEATURED CATEGORIES</h3>
        <div className=' grid grid-cols-5 grid-rows-2 gap-13 gap-y-3   '>
          {/* {
            categories.map((item,idx)=><Cart name={item.name} img={item.imageUrl} key={idx} />)
          } */}
        </div>
      </div>

{/* sales banner */}
      <Saleban />
      <div className='mt-4 flex flex-col justify-center items-center gap-4 mb-4'>
        <h3 className='font-bold'>NEW ARRIVELS</h3>
        <div className=' grid grid-cols-5 grid-rows-2 gap-13 gap-y-3   '>
          {
            productData.map((prod,idx)=> <Prodcart product={prod} key={idx} />)
          }
        </div>
      </div>

{/* //match the mood */}

      <div className='mt-10 flex flex-col justify-center items-center gap-4  '>
        <h3 className='font-bold'>MATCH THE MOOD</h3>
        <div className='   grid grid-cols-12 w-[60%] text-center gap-2'>
          <div className='col-span-4 h-122 text-mist-200 text-2xl bg-gray-200 bg-[url(\img3.jpg)]  bg-no-repeat bg-cover font-bold'>
            FORMAL <br/> <span className='text-amber-400 font-bold text-2xl'>WEAR</span> 
          </div>
          <div className='col-span-4 flex flex-col justify-between h-122'> 

            <div className=' h-60  bg-gray-300 text-2xl font-bold
          bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9rriULvLV5e5U3v6GIyC14yXmJnePEk00nibtlrz4A&s)] bg-no-repeat bg-cover'
            >BASICS <span className='text-amber-700 font-bold text-2xl' >WEAR</span>
            </div>
            <div className={ `h-60  text-2xl font-bold bg-gray-400 bg-[url(/im2.jpg)] bg-no-repeat bg-cover `}>
              LUXURY <span className='text-amber-700 font-bold text-2xl' >CURATED</span>
            </div>
          </div>
          <div className="col-span-4 h-122 text-amber-400 font-bold text-2xl bg-gray-500 bg-[url(/img3.jpg)]  bg-cover">
            TRENDING
          </div>
        </div>

      </div>

      <section className='flex flex-col justify-center items-center mt-20 gap-10'> 
        <div className='flex gap-2'>
          <button className='w-30 border-2 border-amber-950 hover:bg-black hover:text-gray-200 cursor-pointer'>ALL</button>
          <button  className='w-30 border-2 border-amber-950 hover:bg-black hover:text-gray-200 cursor-pointer'>SHIRT</button>
          <button  className='w-30 border-2 border-amber-950 hover:bg-black hover:text-gray-200 cursor-pointer'>TROUSERS</button>
          <button  className='w-30 border-2 border-amber-950 hover:bg-black hover:text-gray-200 cursor-pointer'>JEANS</button>
          <button  className='w-30 border-2 border-amber-950 hover:bg-black hover:text-gray-200 cursor-pointer'>T-SHIRT</button>
        </div>
         <div className=' grid grid-cols-5 grid-rows-2 gap-13 gap-y-3   '>
         {
            productData.map((prod,idx)=> <Prodcart product={prod} key={idx} />)
          } 
        </div>
        
      </section>

      <Footer/>

    </section>
  )
}

export default Home