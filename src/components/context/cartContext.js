import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { hydrate } from "react-dom";

   export let cartContext =  createContext()

   export default function CartContextProvider({children}){

   async function addToCart(productId){

    return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            productId:productId
        },
        {
            headers:{
                token:localStorage.getItem("token")
            }

        }
        ).then((response)=> response)
        .catch((error)=>error)

    }

    //getLoggedUserCart.....

    function getLoggedUserCart(){
      return  axios.get("https://ecommerce.routemisr.com/api/v1/cart",
        {
            headers:{
                token:localStorage.getItem("token")
            }
        }).then((response)=>response)
        .catch((error)=>error)
    }


    //Remove cart item
    function removeCartItem(productId){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            headers:{
                token:localStorage.getItem("token")
            }
        }).then((response)=>response)
        .catch((error)=>error)
    }

    //update product quantityy....

    function updateProducteQuantity(productId,count){

       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count},
        {
            headers:{
                token:localStorage.getItem("token")
            }
        }).then((response)=>response)
        .catch((error)=>error)

    }


    //clear cart items....

    function clearCartItems(){
        axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token:localStorage.getItem("token")
            }
        })
    }

    //online payments
    function onlinePayment(cartId,values){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
                shippingAddress:values
        },{
            headers:{
                token:localStorage.getItem("token")
            }
        }).then((response)=>response)
        .catch((error)=>error)
    }


    //get cart Id
    const [cartId, setcartId] = useState(null)
    async function getCart(){
        let {data} = await getLoggedUserCart()
        setcartId(data?.data._id)

    }

    useEffect(()=>{
        getCart()
    },[])



    //start making add wishlist....
    let [wishlist, setWishlist] = useState([]);


    function addWishClick(id) {
        if (!wishlist.includes(id)) {
          setWishlist([...wishlist, id]);
        }
      }

    function addToWishList(productId){
        return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
            productId:productId
        },{
            headers:{
                token : localStorage.getItem("token")
            }
        }).then((respnse)=>{
            addWishClick(productId)
            return respnse

        })
        .catch((error)=>error)
       
    }

    //start getLogged the userWishlist.........

    function getLoggedUserWishlist() {
        return axios
          .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: { token: localStorage.getItem("token") },
          })
          .then((response) => {
            setWishlist(
              response.data.data.map((product) => {
                return product.id;
              })
            );
            return response;
          })
          .catch((error) => error);
      }

      //remove WishList Item...

      function removeWishClick(id) {
        setWishlist(wishlist.filter((wish) => wish !== id));
      }
      function removeProductWishlist(id) {
        return axios
          .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: { token: localStorage.getItem("token") },
          })
          .then((response) => {
            removeWishClick(id);
            return response;
          })
          .catch((error) => error);
      }
    

    return <cartContext.Provider value={{cartId,wishlist,
        addToCart
    ,getLoggedUserCart,
    removeCartItem,
    updateProducteQuantity,
    clearCartItems,
    onlinePayment,
    addToWishList,getLoggedUserWishlist,removeProductWishlist
    }}>

        {children}
    </cartContext.Provider>


   }