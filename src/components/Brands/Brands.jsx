import React, { useState } from 'react'
import style from "./Brands.module.css"
import axios from 'axios'
import { useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Brands() {

  const [brand, setbrand] = useState(null)
  async  function getAllBrands(){

      let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      setbrand(data?.data)
      

    }
    useEffect(()=>{
      getAllBrands()

    },[])

  //   if(brand === null){
  //     return<>
  //     <BallTriangle
  // height={100}
  // width={100}
  // radius={5}
  // color="#4fa94d"
  // ariaLabel="ball-triangle-loading"
  // wrapperClass={{}}
  // wrapperStyle=""
  // visible={true}></BallTriangle>
      
  //     </>
  //   }


  return<>{brand?<div>
    <h1 className='text-center fw-bold text-main mt-5 mb-5'>All Brands</h1>
    <div className="row g-4">
     {brand?.map((brand,idx)=> <>
     <div key={idx} className="col-md-3   cursor-pointer   ">
      <div className="brand border rounded-2 p-2 w-100 ">
              <img className='w-100' src={brand.image} alt={brand.name} />
              <div className="slug text-center fw-bold mb-5">
                {brand.slug}
              </div>

      </div>
      <Helmet>
          <title>Brands</title>
        </Helmet>
     </div>
     </>)}


    </div>
    </div>:<div className='d-flex align-items-center justify-content-center'>
              <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}></BallTriangle> </div>}



                </>
                  
                  
     }
