import React, { useState, useEffect } from "react";

const api_url = "https://smallbasketapi.onrender.com"

const ProductDisplay = ({ order }) => {

    const [products,setProducts]=useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (order.length > 0) {
            order.forEach((item) => {
                fetch(`${api_url}/product-details/${Number(item)}`, { method: "GET" })
                    .then((res) => res.json())
                    .then((data) => {
                        setProducts((details) => [...details, data]);
                        setLoading(false);
                    });
            });
        }
    }, [order]);

      return products.map((product) => (
        <>
            {loading ? (
                <div className="container d-flex justify-content-center">
                    <img src="/loader.gif" alt="loading"></img>
                </div>
            ) : (
                <div
                    key={product[0].product_id}
                    className="col-xl-5 d-flex border border-secondary justify-content-center mt-4 mb-4"
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
            )}
        </>
    ));

}

export default ProductDisplay;