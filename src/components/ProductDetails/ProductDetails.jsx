import React, { useContext } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { cartContext } from '../context/cartContext'
import Slider from 'react-slick'


export default function ProductDetails() {

  let {id} =  useParams()
  let {addToCart} = useContext(cartContext)

  async function addProduct(productId){
    let response = await addToCart(productId)

    if(response.data.status === 'success'){
      toast.success(response.data.message)
    }else{
      toast.error("Error adding product")

    }
    console.log(response);
  }

  function getProductDetails(){

   return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

 let {data,isLoading} = useQuery("getProductDetails",getProductDetails)

 const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};
  return <>
  <Helmet>
        <title>{data?.data.data.title}</title>
      </Helmet>

  {data?.data.data?<div className='row align-items-center py-2 '>

    <div className="col-md-4 mb-3">
      {/* <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} /> */}
      <Slider {...settings}>
              {data?.data.data.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    alt={data?.data.data.title}
                    className="w-100"
                  />
                );
              })}
            </Slider>
    </div>
    <div className="col-md-8">
      <h2 className='h5'>{data?.data.data.title}</h2>
      
      <p>{data?.data.data.description}</p>
      <h6 className='text-main'>{data?.data.data.category.name}</h6>
      <h6 className='text-main'>Price : {data?.data.data.price} EGP</h6>

      <div className="d-flex justify-content-between">

        <span>ratingsQuantity : {data?.data.data.ratingsQuantity}</span>
        <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
      </div>
      <button onClick={()=> addProduct(id)} className='btn bg-main text-white mt-2 w-100'>Add to cart</button>
    </div>




  </div>: ''}
 
  
  </>
}
