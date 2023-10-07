import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';



export default function Orders() {
  // const [userId, setuserId] = useState(null)

  // async function getUserOrders(userId) {
  //   let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  //   console.log(data);
  // }

  // useEffect(() => {

  //   let res = jwtDecode(localStorage.getItem("token"));

  //   getUserOrders(res.id);


  // }, []);



  // return <>


  // </>;


  const { id } = jwtDecode(localStorage.getItem("token"));

  async function getOrders(id) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }

  const { isLoading, isError, data, isFetching } = useQuery("getOrders", () =>
    getOrders(id)
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
      </Helmet>
      {isLoading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      {data?.data.length !== 0 ? (
        <div className="py-5">
          {data?.data.map((order) => {
            return (
              <div className="p-3 my-3 bg-main-light" key={order.id}>
                <h3 className="text-main">Order ID : {order.id}</h3>
                <h4 className="text-main">
                  Total Price : {order.totalOrderPrice} EGP
                </h4>
                <div className="row g-4 my-2">
                  {order.cartItems.map((item) => {
                    return (
                      <div className="col-md-6" key={item._id}>
                        <div className="row">
                          <div className="col-4">
                            <img
                              className="w-100"
                              src={item.product.imageCover}
                              alt={item.id}
                            />
                          </div>
                          <div className="col-8 d-flex justify-content-center flex-column">
                            <h6 className="fw-bold">
                              {item.product.title
                                .split(" ")
                                .slice(0, 4)
                                .join(" ")}
                            </h6>
                            <p className="text-main fw-bold">
                              Item Count : {item.count}
                            </p>
                            <p className="text-main fw-bold">
                              Item Price : {item.price} EGP
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center px-3 my-5 bg-main-light">
          <h2>There are no orders.</h2>
        </div>
      )}
    </>
  );
}
