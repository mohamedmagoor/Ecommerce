import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet';

export default function Categories() {

  const [category, setcategory] = useState(null)

  async function getAllCategories(){
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    console.log(data.data);
    setcategory(data.data)

  }

  useEffect(()=>{
      getAllCategories()
  },[])
  return <><div className="row mt-5 g-3">

    {category?<>

    {category.map((category,idx)=> <div className='col-md-4 cursor-pointer rounded' key={idx}>
      <div  className="category rounded">
        <div className="imagecategory rounded ">
          <img height={300} className='w-100 ratio-4x3 object-fit-cover rounded' src={category.image} alt={category.name} />
        </div>
        <Helmet>
          <title>Categories</title>
        </Helmet>
        
        <h2 className='fw-bold text-main text-center p-3'>{category.name}</h2>
      </div>


    </div>
       )}



    </>:''}



  </div>


  
  
  </>
 
}
