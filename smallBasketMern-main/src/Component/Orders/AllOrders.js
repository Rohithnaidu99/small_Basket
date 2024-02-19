import React, { useState, useEffect } from "react";
import ProductDisplay from './ProductDisplay.js'

const api_url = "https://smallbasketapi.onrender.com"

const AllOrders = () => {

    const orders = JSON.parse(sessionStorage.getItem('orders'))
    const [loading, setLoading] = useState(true);
    const [ordersDetails,setOrdersDetails] = useState([])
    

    useEffect(() => {
        if (orders !== null) {
          orders.forEach((item) => {
            fetch(`${api_url}/orderSuccess/${Number(item)}`, { method: "GET" })
              .then((res) => res.json())
              .then((data) => {
                setOrdersDetails((prevDetails) => [...prevDetails, data]);
                setLoading(false);
              });
          });
        } else {
          setLoading(false);
        }
      }, []);

    const renderOrders=(data)=>{
        return data.map((order)=>(
            <>
            <div className="container-fluid shadow mt-5 mb-5 text-center">
                <div className="row bg-warning rounded-top">
                    <div className="col-lg-3 mt-3">
                        <label htmlFor="orderDate" className="fw-bold control-label">Order Placed</label>
                        <p id="orderDate">{order[0].order_date}</p>
                    </div>
                    <div className="col-lg-3 mt-3">
                        <label htmlFor="total" className="fw-bold control-label">Total</label>
                        <p id="total">₹{order[0].amount}</p>
                    </div>
                    <div className="col-lg-3 mt-3">
                        <label htmlFor="name" className="fw-bold control-label">Deliver To</label>
                        <p id="name">{order[0].name}</p>
                    </div>
                    <div className="col-lg-3 mt-3">
                        <label htmlFor="orderId" className="fw-bold control-label">Order Id</label>
                        <p id="orderId">{order[0].order_id}</p>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-5 mt-3">
                        <label htmlFor="email" className="fw-bold control-label">Email</label>
                        <p id="email">{order[0].email}</p>
                    </div>
                    <div className="col-lg-5 mt-3">
                        <label htmlFor="mobile" className="fw-bold control-label">Mobile Number</label>
                        <p id="mobile">{order[0].mobile}</p>
                    </div>
                    <div className="col-lg-3 mt-3">
                        <label htmlFor="pin_code" className="fw-bold control-label">Pin Code</label>
                        <p id="pin_code">{order[0].pin_code}</p>
                    </div>
                    <div className="col-lg-3 mt-3">
                        <label htmlFor="payment" className="fw-bold control-label">Payment Mode</label>
                        <p id="payment">{order[0].payment}</p>
                    </div>
                    <div className="col-12 mt-3">
                        <label htmlFor="address" className="fw-bold control-label">Address</label>
                        <p id="address">{order[0].address}</p>
                    </div>
                </div>
                <hr></hr>
                <div className="row d-flex justify-content-center">
                    <label className="fw-bold control-label">Order Summary</label>
                    <ProductDisplay order={order[0].products} />
                </div>
            </div>
            <hr></hr>
            </>
        ))
    }

    return(
        <>
            {loading ? (
                <div className="container d-flex justify-content-center">
                    <img src="/loader.gif" alt="loading"></img>
                </div>
            ) : (
                <>
                    {ordersDetails.length>0?(
                        <div className="col-lg-8 container-fluid mt-3 mb-5">
                            <h2 className="text-center text-danger">Your Orders</h2>
                            <hr className="hr" />
                            {renderOrders(ordersDetails)}
                        </div>
                    ):(
                        <h2 className="text-danger text-center mt-5 mb-5"><em>
                            <p>Look's like you haven't placed any orders yet!</p><p>Start adding items to your basket now!</p><p>Happy shopping!</p>
                        </em></h2>
                    )}
                </>
            )}
        </>
    )
}

export default AllOrders