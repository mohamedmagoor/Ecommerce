import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'


export default function Orders() {

  // const [userId, setuserId] = useState(null)


        async function getUserOrders(userId){
          let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
          console.log(data);
        }

  useEffect(() => {
   
    let res = jwtDecode(localStorage.getItem("token"))
   
    getUserOrders(res.id)
  
    
  }, [])
     


  return <>
  
  
  </>
}
