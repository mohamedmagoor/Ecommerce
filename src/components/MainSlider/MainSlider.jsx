import React from 'react'
import slider1 from "../../Assets/images/slider-image-1.jpeg"
import slider2 from "../../Assets/images/slider-image-2.jpeg"
import slider3 from "../../Assets/images/slider-image-3.jpeg"
import blog1 from "../../Assets/images/grocery-banner-2.jpeg"
import blog2 from "../../Assets/images/grocery-banner.png"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,responsive: [
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

  <div className="row g-0">
    <div className="col-md-9">

    <Slider {...settings}>
          <img height={400} className='w-100'  src={slider1} alt="mainSlider" />
          <img height={400} className='w-100' src={slider2} alt="mainSlider" />
          <img height={400} className='w-100'  src={slider3} alt="mainSlider" />
        </Slider>
  

    </div>
    <div className="col-md-3">
      <img className='w-100' height={200} src={blog1} alt="blog1" />
      <img className='w-100'  height={200} src={blog2} alt="blog2" />
    </div>
  </div>


  
  </>
}
