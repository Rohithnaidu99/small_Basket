import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './OrderSuccess.css'

const api_url = "https://smallbasketapi.onrender.com"

const OrderSuccess = () => {
    
    let params = useParams();
    let navigate=useNavigate();
    const [loading, setLoading] = useState(true);

    const [orderDetails,setOrderDetails] = useState([])

    useEffect(()=>{
        let order_id=params.order_id;
        fetch(`${api_url}/orderSuccess/${order_id}`,{method:"GET"})
            .then((res)=>res.json())
            .then((data)=>{
                setOrderDetails(data)
                setLoading(false);
            })
    },[])

    const navigateToHome=()=>{
        navigate('/')
    }

    const navigateToOrders=()=>{
        navigate('/allOrders')
    }

    return (
        <>
            {loading ? (
                <div className="container d-flex justify-content-center">
                <img src="/loader.gif" alt="loading"></img>
                </div>
            ) : (
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-12 d-flex justify-content-center">
                            <img src="https://www.bikaji.com/pub/media/animation.gif" alt="image" border="0"/>
                        </div>
                        <div className="d-flex justify-content-center col-12">
                            <img className="successImg" src="https://i.ibb.co/LZynXFH/image.png" alt="image" border="0"/>
                            <p className="orderText">Order successfully placed for {orderDetails[0].name} with Order ID: {orderDetails[0].order_id}</p>
                        </div>
                        <div className="d-flex justify-content-center col-12">
                            <p className="fs-5 fw-bold text-secondary">What do you want to do next?</p>
                        </div>
                        <div className="col-12 d-flex justify-content-around">
                            <button onClick={navigateToHome} type="button" className='btn btn-outline-success mt-2 btn-sm shadow-none fs-5 col-4'>
                                Continue Shopping
                            </button>
                            <button onClick={navigateToOrders} type="button" className='btn btn-outline-warning mt-2 btn-sm shadow-none fs-5 col-4'>
                                View Orders
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default OrderSuccess