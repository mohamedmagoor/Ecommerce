import React, { useContext, useState } from 'react'
import { cartContext } from '../context/cartContext'
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Wishlist() {

  const [loading, setLoading] = useState(false);
  let {getLoggedUserWishlist,wishlist,addToCart,removeProductWishlist} = useContext(cartContext)


   async function getWishList(){
      return await getLoggedUserWishlist()
    }
    const { isLoading, isError, data, isFetching, refetch } = useQuery(
      "getWishlist",
      getWishList
    );

    async function removeWishlistItem(id) {
      setLoading(true);
      const response = await removeProductWishlist(id);
      setLoading(false);
  
      if (response.data.status === "success") {
        refetch();
        toast.success("The item is removed from wishlist.");
      } else {
        toast.error("The item is not removed from wishlist.");
      }
    }
    

    async function addProductToCart(id) {
      setLoading(true);
      const response = await addToCart(id);
      setLoading(false);
  
      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error("Product not added successfully to your cart");
      }
  
      removeWishlistItem(id);
    }
  

  return <> 
    
    {isLoading || loading ? (
        <div className="position-fixed top-0 start-0 bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      {data?.data.count > 0 ? (
        <div className="row g-3 py-5">
          {data?.data.data.map((product) => {
            return (
              <div key={product.id} className="col-lg-2 col-md-4 col-sm-6">
                <div className="product p-2 position-relative">
                  <NavLink to={`/productdetails/${product.id}`}>
                    <img
                      className="w-100"
                      src={product.imageCover}
                      alt={product.title.split(" ").slice(0, 2).join(" ")}
                    />
                    <span className="text-main font-sm fw-bolder my-1 d-block">
                      {product.subcategory.name}
                    </span>
                    <h3 className="h6 fw-bolder">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="my-3 d-flex justify-content-between align-items-center">
                      <span className="price">{product.price} EGP</span>
                      <span className="rate">
                        <i className="fas fa-star rating-color"></i>{" "}
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </NavLink>
                  <div className="d-flex gap-3">
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="btn bg-main text-white btn-sm">
                      Add To Cart
                    </button>
                    <button
                      onClick={() => {
                        removeWishlistItem(product.id);
                      }}
                      className="btn text-white bg-main mx-auto btn-sm">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center px-3 my-5 bg-main-light">
          <h2>There are no itmes.</h2>
        </div>
      )}
    
    </>
 
}
