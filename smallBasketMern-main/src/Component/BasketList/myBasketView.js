import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './basket.css'

const api_url = "https://smallbasketapi.onrender.com";

const BasketItems = () => {
  const basketItems = JSON.parse(sessionStorage.getItem("basketItems"));
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  const placeOrder=()=>{
    navigate('/orderDetails');
  }

  let total = 0;
  let mrpTotal = 0;
  let discount = 0;
  let totalDiscount = 0;
  let itemsCount = 0;

  useEffect(() => {
    if (basketItems !== null) {
      basketItems.forEach((item) => {
        fetch(`${api_url}/product-details/${Number(item)}`, { method: "GET" })
          .then((res) => res.json())
          .then((data) => {
            setProductDetails((prevDetails) => [...prevDetails, data]);
            setLoading(false);
          });
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (productDetails.length > 0) {
    total = productDetails.reduce(
      (acc, product) => acc + Number(product[0].discounted_price),
      0
    );
    mrpTotal = productDetails.reduce(
      (acc, product) => acc + Number(product[0].original_price),
      0
    );
    totalDiscount = mrpTotal - total;
    discount = (totalDiscount / mrpTotal) * 100;
    itemsCount = productDetails.length;
  }

  const renderBasket = (data) => {
    return data.map((product) => (
      <>
        <div
          key={product[0].product_id}
          className="row d-flex justify-content-center mt-4 shadow-sm"
        >
          <div className="col-2 mt-2 ImgDiv">
            <img
              className="h-100 w-100"
              src={product[0].product_image}
              alt={product[0].product_name}
            />
          </div>
          <div key={product[0].product_id} className="col-6 ms-5 mt-2">
            <h4>{product[0].product_name}</h4>
            <p className="text-secondary">
              Quantity: {product[0].product_quantity}
            </p>
            <p className="text-success block fw-bold m-0 p-0">
              {(
                ((Number(product[0].original_price) -
                  Number(product[0].discounted_price)) /
                  Number(product[0].original_price)) *
                100
              ).toFixed(1)}
              % OFF
            </p>
            <p className="block m-0 p-0 fw-bold">
              Price: ₹{product[0].discounted_price}
            </p>
            <p className="text-decoration-line-through text-secondary block m-0 p-0">
              MRP Price: ₹{product[0].original_price}
            </p>
            <p className="block m-0 p-0 fw-bold text-success">
              You save: ₹
              {Number(product[0].original_price) -
                Number(product[0].discounted_price)}
            </p>
          </div>
        </div>
      </>
    ));
  };

  return (
    <>
      {loading ? (
        <div className="container d-flex justify-content-center">
          <img src="/loader.gif" alt="loading"></img>
        </div>
      ) : (
        <>
          {productDetails.length > 0 ? (
            <>
              <div className="row">
                <div className="col-lg-8 container-fluid mt-3 mb-5">
                  <h2 className="text-center text-danger">Your Basket</h2>
                  <hr className="hr" />

                  {renderBasket(productDetails)}
                </div>

                <div className="col-lg-4 mt-3 container text-center mrpBackground h-100 rounded">
                  <h2 className="text-center text-danger mt-2">Order Details</h2>
                  <hr className="hr border border-danger"/>
                  <div className="row">
                    <div className="col-5">
                      <p className="fs-5 fw-bold">Number of Items</p>
                    </div>
                    <div className="col-2">
                    <p className="fs-5 fw-bold">:</p>
                    </div>
                    <div className="col-5">
                      <p className="fs-5 fw-bold text-primary">{itemsCount}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <p className="fs-5 fw-bold">MRP Total</p>
                    </div>
                    <div className="col-2">
                    <p className="fs-5 fw-bold">:</p>
                    </div>
                    <div className="col-5">
                      <p className="fs-5 fw-bold text-danger">₹{mrpTotal.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <p className="fs-5 fw-bold">Discount</p>
                    </div>
                    <div className="col-2">
                    <p className="fs-5 fw-bold">:</p>
                    </div>
                    <div className="col-5">
                      <p className="fs-5 fw-bold text-warning">{discount.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <p className="fs-5 fw-bold">Delivery Charges</p>
                    </div>
                    <div className="col-2">
                    <p className="fs-5 fw-bold">:</p>
                    </div>
                    <div className="col-5">
                      <p className="fs-5 fw-bold text-info">Free</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5">
                      <p className="fs-5 fw-bold">Total</p>
                    </div>
                    <div className="col-2">
                    <p className="fs-5 fw-bold">:</p>
                    </div>
                    <div className="col-5">
                      <p className="fs-5 fw-bold text-success">₹{total.toFixed(2)}</p>
                    </div>
                  </div>
                  <hr className="hr border border-danger"/>
                  <button
                    onClick={placeOrder}
                    type="button"
                    className="btn btn-outline-danger mt-1 btn-sm shadow-none fs-5 col-11 mb-4"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h2 className="text-danger text-center mt-5 mb-5"><em>
              No Items in the Basket. Continue Shopping and Add Items.
            </em></h2>
          )}
        </>
      )}
    </>
  );
};

export default BasketItems;
