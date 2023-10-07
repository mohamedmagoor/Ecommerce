import React, { useContext, useEffect, useState } from 'react'
import style from "./FeaturedProducts.module.css"
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContext } from '../context/cartContext';
import toast from 'react-hot-toast';




export default function FeaturedProducts() {

  let {addToCart,addToWishList,wishlist} = useContext(cartContext)
  const [loading, setLoading] = useState(false);

   

  async function addProductToWishList(id){

    setLoading(true)

    let {data} =  await addToWishList(id)
    setLoading(false)

    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error("Product not added successfully to your wishlist");
    }
    console.log(data);

   }
   

  async function addProduct(productId){
    let response = await addToCart(productId)

    if(response.data.status === 'success'){
      toast.success(response.data.message)
    }else{
      toast.error("Error adding product")

    }
    console.log(response);
  }
  


 

  function getFeaturedProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  let {data,isLoading } = useQuery("featuredProducts",getFeaturedProducts,{
    // cacheTime:3000,
    // refetchOnMount:false
    // refetchInterval:1000
    // enabled:true
  })
  // console.log(data?.data.data);
   
  return <>

  {isLoading ?<div className="w-100 h-100 py-5 d-flex justify-content-center align-items-center">
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
  </div>:<div className="container py-2">
   
    <div className="row">
       
      {data?.data.data.map((product)=> <div key={product.id} className='col-md-2'>
         
        <div className="product cursor-pointer py-3 px-2">
          <Link to={`/productdetails/${product.id}`}>
          <img className='w-100' src={product.imageCover} alt={product.title} />
          <span className='text-main font-sm fw-bolder'> {product.category.name}</span>
          <h3 className='h6 fw-bold'>{product.title.split(" ").slice(0,2).join(" ")}</h3>

          <div className='d-flex justify-content-between mt-3'>
            <span> {product.price}EGP</span>
            <span> 
              <i className='fas fa-star rating-color'></i>
              {product.ratingsAverage}
            </span>
          </div>
          
            </Link>
            <div className="d-flex justify-content-between align-items-center">
              <button onClick={()=> addProduct(product.id)} className='btn bg-main text-white mt-2 btn-sm'>Add to cart</button>
                  <button
                    onClick={() => {
                      addProductToWishList(product.id);
                    }}
                    className="btn text-white bg-main mx-auto mt-2 text-center btn-sm">
                    <i
                      className={`fa-${
                        wishlist.includes(product.id) ? "solid" : "regular"
                      } fa-heart`}></i>
                  </button>
            </div>
                  
        </div>
     

      
      </div>)
      
      }
     

    </div>
 
  </div>}

  

  
  
  </>
}
