import React from 'react'
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts"
import CategorySlider from '../categorySlider/categorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'

export default function Home() {

 

  return <>
  <Helmet><title> Fresh Cart Home</title></Helmet>
  <MainSlider/>
  <CategorySlider/>
  <FeaturedProducts/>
  
    
  </>
}
