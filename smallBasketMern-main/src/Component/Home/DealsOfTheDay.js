import React, { useState, useEffect } from "react";
import "./DealsOfTheDay.css";
import {Link , useNavigate} from 'react-router-dom';
import AddToBasketButton from "../BasketList/myBasketLogic";

const api_url = "https://smallbasketapi.onrender.com";

const DealsOfTheDay = () => {

  let navigate=useNavigate();
  const [product, setProduct] = useState("");

  useEffect(() => {
    fetch(`${api_url}/dealsOfTheDay`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  const navigateToAllProducts=()=>{
    navigate('/allProducts')
  }

  const renderProduct = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <div key={item.product_id} className="col-xl-3 col-lg-4 col-md-5 col-sm-6 itemTile shadow-sm mt-4">
            <div className="owlCarouselImgDiv m-auto">
              <Link to={`/product-details/${item.product_id}`} key={item.product_id}>
                <img
                  className="h-100 w-100"
                  src={item.product_image}
                  alt={item.product_name}
                />
              </Link>
            </div>
            
            <div className="ms-4 mt-2">
              <Link to={`/product-details/${item.product_id}`} key={item.product_id} className="text-dark text-decoration-none">
                <h6>{item.product_name}</h6>
              </Link>
              <span className="text-secondary">{item.product_quantity}</span>
            </div>
            <div className="ms-4 w-auto d-flex justify-content-between">
              <div>
                <p className="block m-0 p-0 fw-bold">₹{item.discounted_price}</p>
                <p className="text-decoration-line-through text-secondary block m-0 p-0">
                  ₹{item.original_price}
                </p>
              </div>
              <div className="me-2">
                <AddToBasketButton productId={item.product_id} />
              </div>
            </div>
          </div>

        );
      });
    }
    else {
      return (
          <div className="container d-flex justify-content-center">
              <img src="/loader.gif" alt="loading"></img>
          </div>
      )
  }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center mt-5 mb-5">
        <button onClick={navigateToAllProducts} type="button" className='col-8 btn btn-outline-info mt-2 btn-sm shadow-none fs-5 col-4'>
            View All Products
        </button>
      </div>
      <div className="container-fluid shadow-sm mt-3">
        <h5 className="text-center">Deals of the Day</h5>
        <hr className="hr" />
        <div className="row d-flex justify-content-center">
          {renderProduct(product)}
        </div>
      </div>
    </>
  );
};

export default DealsOfTheDay;
