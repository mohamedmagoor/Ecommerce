import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function CategorySlider() {

  function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  let {isError , isLoading, data} = useQuery("categorySlider",getCategories)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    
  };
  return <>

  {data?.data.data?

  <div className='py-4'>
<Slider {...settings}>

      {data?.data.data.map((category,idx)=> <img height={200} key={category._id} src={category.image}/>)}
  </Slider>

  </div>
  :""}
  

  </>
}
