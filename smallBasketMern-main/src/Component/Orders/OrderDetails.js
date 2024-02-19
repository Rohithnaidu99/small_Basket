import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './OrderDetails.css'

const api_url = "https://smallbasketapi.onrender.com"

const OrderDetails = () => {
    let navigate = useNavigate();

    const basketItems = JSON.parse(sessionStorage.getItem("basketItems"));
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const orders = JSON.parse(sessionStorage.getItem('orders')) || [];

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

    let total = 0;
    let itemsCount = 0;

    if (productDetails.length > 0) {
        total = productDetails.reduce(
            (acc, product) => acc + Number(product[0].discounted_price),
            0
        );
        itemsCount = productDetails.length;
    }

    const renderBasket = (data) => {
        return data.map((product) => (
            <>
                <div
                    key={product[0].product_id}
                    className="col-6 d-flex justify-content-center mt-4 shadow-sm"
                >
                    <div className="col-2 mt-2 OrdersImgDiv">
                        <img
                            className="h-100 w-100"
                            src={product[0].product_image}
                            alt={product[0].product_name}
                        />
                    </div>
                    <div key={product[0].product_id} className="col-6 ms-5 mt-2">
                        <h6>{product[0].product_name}</h6>
                        <p className="text-secondary fs-6">
                            Quantity: {product[0].product_quantity}
                        </p>
                        <p className="block m-0 p-0 fw-bold">
                            Price: ₹{product[0].discounted_price}
                        </p>
                    </div>
                </div>
            </>
        ));
    };

    const initialValues = {
        order_id: Math.floor(Math.random() * 100000),
        name: "",
        email: "",
        mobile: "",
        address: "",
        pin_code: "",
        products: {},
        amount: "",
        payment: "",
        order_date:""
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const checkout = (e) => {
        e.preventDefault();

        let isValid = true;

        if (values.name.trim().length === 0) {
            document.getElementById("nameDiv").classList.add("border", "border-danger");
            isValid = false;
        }
    
        if (values.email.trim().length === 0) {
            document.getElementById("email").classList.add("border", "border-danger");
            isValid = false;
        }
    
        if (values.mobile.trim().length === 0) {
            document.getElementById("mobile").classList.add("border", "border-danger");
            isValid = false;
        }
    
        if (values.address.trim().length === 0) {
            document.getElementById("address").classList.add("border", "border-danger");
            isValid = false;
        }
    
        if (values.pin_code.trim().length === 0) {
            document.getElementById("pin_code").classList.add("border", "border-danger");
            isValid = false;
        }
    
        if (values.payment.trim().length === 0) {
            document.getElementById("payment").classList.add("border", "border-danger");
            isValid = false;
        }
    
        if (!isValid) {
            return;
        }
        
        fetch(`${api_url}/orderDetails`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(()=>{
                sessionStorage.removeItem("basketItems");
                navigate(`/orderSuccess/${values.order_id}`);
            })

        orders.push(values.order_id);
        sessionStorage.setItem('orders', JSON.stringify(orders));
    }

    values.amount = total;
    values.products = basketItems;

    const today = new Date();
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = today.toLocaleDateString('en-IN', dateOptions);

    values.order_date=formattedDate

    function validateName() {
        let nameField = document.getElementById('name').value;
        let nameDiv = document.getElementById('name');
        if (nameField.trim().length == 0) {
            nameDiv.classList.add('border', 'border-danger')
        } else {
            nameDiv.classList.remove('border', 'border-danger')
            nameDiv.classList.add('border', 'border-success')
        }
    }


    const validateEmail = () => {
        let email = document.getElementById('email').value;
        let emailDiv = document.getElementById('email');
        if (email.trim().length == 0) {
            emailDiv.classList.add('border', 'border-danger')
        } else {
            if (email.match("^([a-zA-Z0-9.]+)@([a-zA-Z0-9.]+)\\.([a-zA-Z]{2,5})$") !== null) {
                emailDiv.classList.remove('border', 'border-danger')
                emailDiv.classList.add('border', 'border-success')
            } else {
                emailDiv.classList.add('border', 'border-danger')
            }
        }
    }

    const validateMobile = () => {
        let mobile = document.getElementById('mobile').value;
        let mobileDiv = document.getElementById('mobile');
        if (mobile.trim().length == 0) {
            mobileDiv.classList.add('border', 'border-danger')
        } else {
            if (/^\d{10}$/.test(mobile)) {
                mobileDiv.classList.remove('border', 'border-danger')
                mobileDiv.classList.add('border', 'border-success')
            } else {
                mobileDiv.classList.add('border', 'border-danger')
            }
        }
    }

    function validateAddress() {
        let address = document.getElementById('address').value;
        let addressDiv = document.getElementById('address');
        if (address.trim().length == 0) {
            addressDiv.classList.add('border', 'border-danger')
        } else {
            addressDiv.classList.remove('border', 'border-danger')
            addressDiv.classList.add('border', 'border-success')
        }
    }

    function validatePin() {
        let pin_code = document.getElementById('pin_code').value;
        let pin_codeDiv = document.getElementById('pin_code');
        if (pin_code.trim().length == 0) {
            pin_codeDiv.classList.add('border', 'border-danger')
        } else {
            if (/^\d{6}$/.test(pin_code)) {
                pin_codeDiv.classList.remove('border', 'border-danger')
                pin_codeDiv.classList.add('border', 'border-success')
            } else {
                pin_codeDiv.classList.add('border', 'border-danger')
            }
        }
    }

    const validatePayment = () => {
        let payment = document.getElementById('payment').value;
        let paymentSelect = document.getElementById('payment');

        if (payment.trim().length === 0) {
            paymentSelect.classList.add('border', 'border-danger');
        } else {
            paymentSelect.classList.remove('border', 'border-danger');
            paymentSelect.classList.add('border', 'border-success');
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-heading text-white rounded-top text-center bg-danger">
                        <h3>Shipping Details</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={checkout}>
                            <label htmlFor="id" className="fw-bold control-label">Order Id</label>
                            <p id="id">{values.order_id}</p>
                            <div className="row">
                                <div className="col-lg-6 form-group " id="nameDiv">
                                    <label htmlFor="name" className="fw-bold control-label"><span className="text-danger">* </span>Name</label>
                                    <input required className="form-control shadow-none" placeholder="Please Enter Full Name" id="name" name="name" value={values.name} onChange={handleInputChange} onBlur={validateName}></input>
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label htmlFor="email" className="fw-bold control-label"><span className="text-danger">* </span>E-Mail</label>
                                    <input required className="form-control shadow-none" id="email" placeholder="Valid Email for Communications" name="email" value={values.email} onChange={handleInputChange} onBlur={validateEmail}></input>
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label htmlFor="mobile" className="fw-bold control-label"><span className="text-danger">* </span>Mobile Number</label>
                                    <input required className="form-control shadow-none" id="mobile" name="mobile" placeholder="Enter a 10 Digit Mobile Number" value={values.mobile} onChange={handleInputChange} onBlur={validateMobile}></input>
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label htmlFor="address" className="fw-bold control-label"><span className="text-danger">* </span>Address</label>
                                    <input required className="form-control shadow-none" id="address" name="address" value={values.address} placeholder="Address for Delivery" onChange={handleInputChange} onBlur={validateAddress}></input>
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label htmlFor="pin_code" className="fw-bold control-label"><span className="text-danger">* </span>Pin Code</label>
                                    <input required className="form-control shadow-none" id="pin_code" name="pin_code" maxLength="6" placeholder="Enter a 6 Digit Pin Code" minLength="6" value={values.pin_code} onBlur={validatePin} onChange={handleInputChange}></input>
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label htmlFor="payment" className="fw-bold control-label"><span className="text-danger">* </span>Payment Method</label>
                                    <select className="form-select shadow-none" id="payment" name="payment" value={values.payment} onBlur={validatePayment} onChange={handleInputChange} required>
                                        <option value="" disabled hidden>Select a payment option</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Card">Card</option>
                                        <option value="UPI">UPI</option>
                                    </select>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row mt-2">
                                <h4 className="text-center">Order Summary</h4>
                                <hr></hr>
                                <div>
                                    <>
                                        {loading ? (
                                            <div className="d-flex justify-content-center">
                                                <img src="/loader.gif" alt="loading"></img>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                {renderBasket(productDetails)}
                                            </div>
                                        )}
                                    </>
                                </div>
                                <div className="row text-center mt-5">
                                    <p className="col-lg-6 fs-4">Number of Items : <span className="text-primary">{itemsCount}</span></p>
                                    <p className="col-lg-6 fs-4">Total Price : <span className="text-success">₹{total.toFixed(2)}</span></p>
                                </div>
                            </div>
                            <button type="submit" className='btn btn-outline-success mt-5 btn-sm shadow-none fs-5 col-12'>
                                Complete Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default OrderDetails