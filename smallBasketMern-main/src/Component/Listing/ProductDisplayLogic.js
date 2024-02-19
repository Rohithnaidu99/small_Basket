import React,{useState,useEffect} from 'react';
import './ProductDisplay.css';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddToBasketButton from '../BasketList/myBasketLogic';

const api_url = "https://smallbasketapi.onrender.com";

const ProductDisplay =() =>{

    let params = useParams();
    
    const [productDetails,setProduct] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchProduct = async()=>{
            try{
                let product_id=params.id;
                const res = await fetch(`${api_url}/product-details/${product_id}`,{method:"GET"})
                const data = await res.json()
                setProduct(data)
                setLoading(false);
            } catch (error) {
                // Handle fetch error
                console.error(error);
            }
        }
        setLoading(true);
        fetchProduct();
    },[params.id]);

    const [relatedProducts,setRelatedProducts] = useState("");

    useEffect(()=>{
        let sub_category_name=productDetails.length>0?productDetails[0].sub_category_name:""
        fetch(`${api_url}/subcategories/${sub_category_name}`,{method:"GET"})
        .then((res1)=>res1.json())
        .then((data1)=> {
            setRelatedProducts(data1)
        })
        .catch((error) => {
            // Handle fetch error
            console.error(error);
        });
    },[productDetails])

    const renderData = (data) =>{
        const renderRelatedData = (data1)=>{
            if(data1){
                return data1.map((item1)=>{
                    return(
                        <div key={item1.product_id} className="col-xl-3 col-lg-4 col-md-5 col-sm-6 itemTile shadow-sm mt-4">
                            <div className="owlCarouselImgDiv m-auto">
                                <Link to={`/product-details/${item1.product_id}`} key={item1.product_id}>
                                    <img
                                        className="h-100 w-100"
                                        src={item1.product_image}
                                        alt={item1.product_name}
                                    />
                                </Link>
                            </div>

                            <div className="ms-4 mt-2">
                                <Link to={`/product-details/${item1.product_id}`} key={item1.product_id} className="text-dark text-decoration-none">
                                    <h6>{item1.product_name}</h6>
                                </Link>
                                <span className="text-secondary">{item1.product_quantity}</span>
                            </div>
                            <div className="ms-4 w-auto d-flex justify-content-between">
                                <div>
                                    <p className="block m-0 p-0 fw-bold">₹{item1.discounted_price}</p>
                                    <p className="text-decoration-line-through text-secondary block m-0 p-0">
                                        ₹{item1.original_price}
                                    </p>
                                </div>
                                <div className="me-2">
                                    <AddToBasketButton productId={item1.product_id} />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            else{
                return(
                    <div className="container d-flex justify-content-center">
                        <img src="/loader.gif" alt="loading"></img>
                    </div>
                )
            }
        }
        if(data){
            if(data.length>0){
                return data.map((item) => {
                    return(
                        <div key={item.product_id} className='item'>
                            <div className="container">
                                <div className="mt-5 row d-flex justify-content-around">
                                    <div className="ProductImage col-md-4 shadow-sm">
                                        <img src={item.product_image} alt={item.product_name} className="image-fluid h-100 w-100"></img>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to={`/brands/${item.brand_name}`} className=" text-muted text-decoration-none">
                                            <p className="fs-6"><u>{item.brand_name}</u></p>
                                        </Link>
                                        <h2 className="mt-3">{item.product_name}</h2>
                                        <p className="mt-3">{item.product_quantity}</p>
                                        <p className="fs-5">{item.product_description}</p>
                                        <p className="fs-6 text-decoration-line-through text-secondary">MRP : ₹{item.original_price}</p>
                                        <p className="text-success block fw-bold m-0 p-0">{((((Number(item.original_price)-Number(item.discounted_price))/Number(item.original_price))*100)).toFixed(1)}% OFF</p>
                                        <p className="fw-bold fs-4">Price : ₹{item.discounted_price}</p>
                                        <p className="block m-0 p-0 fw-bold text-success">You save: ₹{(Number(item.original_price)-Number(item.discounted_price))}</p>
                                        <p><span>Availability : </span><span className="text-success">In Stock</span></p>
                                        <p><i className="bi bi-truck text-success fs-4"></i>&nbsp;Standard: Tomorrow 9:00AM - 1:30PM</p>
                                        <AddToBasketButton productId={item.product_id} />
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="container mt-5">
                                <h3 className="text-center fs-4 text-decoration-underline">Related Products</h3>
                                <div className="row d-flex justify-content-center">
                                    {renderRelatedData(relatedProducts)}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            else{
                return(
                    <h2 className="text-danger text-center mt-5 mb-5">Out Of Stock</h2>
                )
            }
        }
        else{
            return(
                <div className="container d-flex justify-content-center">
                    <img src="/loader.gif" alt="loading"></img>
                </div>
            )
        }
    }

    return(
        <>
            {loading ? (
                <div className="container d-flex justify-content-center">
                    <img src="/loader.gif" alt="loading"></img>
                </div>
            ) : (
                <div>
                    {renderData(productDetails)}
                </div>
            )}
        </>
    )
    
}

export default ProductDisplay