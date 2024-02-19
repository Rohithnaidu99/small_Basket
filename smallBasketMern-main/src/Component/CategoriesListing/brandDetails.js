import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import AddToBasketButton from '../BasketList/myBasketLogic';

const api_url = "https://smallbasketapi.onrender.com";

const BrandDetails = () => {

    let params = useParams();

    const [brandDetails, setBrandDetails] = useState("");
    const [loading, setLoading] = useState(true);
    const [brandName, setBrandName] = useState("");

    // useEffect(() => {
    //     let sub_category_name = params.sub_category_name;
    //     fetch(`${api_url}/subcategories/${sub_category_name}`, { method: "GET" })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setSubCategories(data)
    //         })
    // }, [])

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                let brand_name = params.brand_name;
                const response = await fetch(`${api_url}/brands/${brand_name}`, { method: "GET" });
                const data = await response.json();
                setBrandDetails(data);
                setLoading(false);
                setBrandName(data.length>0?data[0].brand_name:"")
            } catch (error) {
                // Handle fetch error
                console.error(error);
            }
        };
        setLoading(true);
        fetchBrands();
    }, [params.brand_name]);

    const renderData = (data) => {
        if (data) {
            if (data.length > 0) {
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
                    )
                })
            }
            else {
                return (
                    <h2 className="text-danger">Out Of Stock</h2>
                )
            }
        }
        else {
            return (
                <div className="container d-flex justify-content-center">
                    <img src="/loader.gif" alt="loading"></img>
                </div>
            )
        }
    }

    return (
        <>
            {loading ? (
                <div className="container d-flex justify-content-center">
                    <img src="/loader.gif" alt="loading"></img>
                </div>
            ) : (
                
                <div className="container-fluid shadow-sm mt-3">
                    <h3 className="text-center">{brandName}</h3>
                    <hr className="hr"/>
                    <div className="row d-flex justify-content-center">
                    {renderData(brandDetails)}
                    </div>
                </div>
            )}
        </>
    )

}

export default BrandDetails