import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css"
import { cartContext } from '../context/cartContext'
import { BallTriangle } from 'react-loader-spinner'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'



export default function Cart() {
//   let navigate = useNavigate()
//   let {getLoggedUserCart,removeCartItem,updateProducteQuantity,clearCartItems} = useContext(cartContext)
//   const [cartDetails, setcartDetails] = useState(null)


//   function clearAllItems(){
//     clearCartItems()

//     navigate("/")
    
//   }

  


//   async  function updateCount(id,count){
//     let {data} = await updateProducteQuantity(id,count)
//     setcartDetails(data)

//     }


//   async function getCart(){

//      let {data} =   await getLoggedUserCart()

//      setcartDetails(data)

//    }

//   async function removeItem(id){
//     let {data} = await removeCartItem(id)
//     setcartDetails(data)
//   }

//   useEffect(()=>{
//     getCart()
//   },[]);
//   return <>
//   {cartDetails?<div className="w-75 my-2 p-3 mx-auto bg-main-light">
   
//     <h3>Shopping Cart</h3>
//     <h4 className='h6 text-main fw-bolder'>Cart Items : {cartDetails.numOfCartItems}</h4>
//     <h4 className='h6 text-main fw-bolder mb-4'>Total Cart Price : {cartDetails.data.totalCartPrice} EGP</h4>
//     <div className='d-flex align-items-center justify-content-between'>
//           <button onClick={()=> clearAllItems()} className='btn btn-primary mb-2'>Clear All Products</button>
//       <div className="payments">
//       <Link to={"/address"} className='btn me-2 bg-main text-white mb-2'>Online Payment</Link>

//       </div>
//     </div>
//     {cartDetails.data.products.map((product)=>{return <>
     
//       <div key={product.product.id} className="row border-bottom py-2 px-2">
//         <div className="col-md-1">
//           <img className='w-100' src={product.product.imageCover} alt={product.product.category.name} />
//         </div>
//         <div className="col-md-11">
//           <div className="d-flex align-items-center justify-content-between">
//           <div>
//           <Helmet>
//           <title>Cart</title>
//         </Helmet>
//             <h3 className='h6'>{product.product.title.split(" ").slice(0,3).join(" ")}</h3>
//             <h6 className='text-main'>Price : {product.price} EGP</h6>
//           </div>

//           <div>
//             <button onClick={()=> updateCount(product.product.id,product.count + 1)} className='btn btn-outline-success '>+</button>
//             <span className='mx-2'>{product.count}</span>
//             <button onClick={()=> updateCount(product.product.id,product.count - 1)} className='btn btn-outline-danger'>-</button>
//           </div>

          
//           </div>
//           <button onClick={()=> removeItem(product.product.id)} className='btn p-0'><i className='fas fa-trash-can text-danger me-1'></i>Remove</button>

//         </div>
//       </div>

    
//     </>
//     })}

//   </div>:<section id='loading' className='d-flex justify-content-center align-items-center'>
//   <BallTriangle
//   height={100}
//   width={100}
//   radius={5}
//   color="#4fa94d"
//   ariaLabel="ball-triangle-loading"
//   wrapperClass={{}}
//   wrapperStyle=""
//   visible={true}
// />

//   </section>
//   }
  
  
//   </>


const [loading, setLoading] = useState(false);

  const { getLoggedUserCart, removeCartItem, updateProducteQuantity, clearCartItems } =
    useContext(cartContext);

  async function getCart() {
    return await getLoggedUserCart();
  }

  const { isLoading, data, refetch } = useQuery(
    "getCart",
    getCart
  );

  async function removeItem(id) {
    setLoading(true);
    const response = await removeCartItem(id);
    setLoading(false);

    if (response.data.status === "success") {
      refetch();
      toast.success("The item is removed.");
    } else {
      toast.error("The item is not removed.");
    }
  }

  async function clearAllCart() {
    setLoading(true);
    const response = await clearCartItems();
    setLoading(false);

    if (response.data.message === "success") {
      refetch();
      toast.success("The cart is clear.");
    } else {
      toast.error("The cart is not clear.");
    }
  }

  async function updateQuantityItem(id, count) {
    setLoading(true);
    const response = await updateProducteQuantity(id, count);
    setLoading(false);

    if (response.data.status === "success") {
      refetch();
      toast.success("The item count is updated.");
    } else {
      toast.error("The item count is not updated.");
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      {isLoading || loading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      <div className="cart my-5 px-3 pt-3 bg-main-light">
        {data?.data !== undefined ? (
          <>
            <h4 className="text-main">
              Number Of Items : {data?.data.numOfCartItems}
            </h4>
            <h5 className="text-main">
              Total Cart Price: {data?.data.data.totalCartPrice} EGP
            </h5>
            <div className="d-flex justify-content-between align-items-center">
              <button
                onClick={() => clearAllCart()}
                className="btn btn-sm bg-main text-white my-2">
                <i className="fas fa-trash me-2"></i>Clear Cart
              </button>
              <NavLink
                to={'/address'}
                className="btn btn-sm bg-main text-white my-2">
                <i className="fa-brands fa-cc-visa me-2"></i>Buy Online
              </NavLink>
            </div>
            <div className="items">
              {data?.data.data.products.map((product) => {
                return (
                  <div className="row py-3 border-bottom" key={product._id}>
                    <div className="col-9">
                      <div className="row">
                        <div className="col-2">
                          <img
                            className="w-100"
                            src={product.product.imageCover}
                            alt={product.product.id}
                          />
                        </div>
                        <div className="col-10 d-flex justify-content-center flex-column">
                          <h6 className="fw-bold">
                            {product.product.title
                              .split(" ")
                              .slice(0, 4)
                              .join(" ")}
                          </h6>
                          <p className="text-main fw-bold">
                            Price : {product.price}
                          </p>
                          <button
                            onClick={() => {
                              removeItem(product.product.id);
                            }}
                            className="btn btn-sm bg-main text-white"
                            style={{ width: 100 }}>
                            <i className="fas fa-trash me-2"></i>Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-end">
                      <button
                        onClick={() => {
                          updateQuantityItem(
                            product.product.id,
                            product.count + 1
                          );
                        }}
                        className="btn btn-sm bg-main text-white fw-bold fs-6">
                        +
                      </button>
                      <span className="mx-2 d-inline-block">
                        {product.count}
                      </span>
                      <button
                        disabled={product.count === 1}
                        onClick={() => {
                          updateQuantityItem(
                            product.product.id,
                            product.count - 1
                          );
                        }}
                        className="btn btn-sm bg-main text-white fw-bold fs-6">
                        -
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="vh-100 d-flex align-items-center justify-content-center">
            <h2>There are no itmes.</h2>
          </div>
        )}
      </div>
    </>
  );
}
