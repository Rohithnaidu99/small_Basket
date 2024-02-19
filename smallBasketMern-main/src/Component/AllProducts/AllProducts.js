import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddToBasketButton from '../BasketList/myBasketLogic';
import './AllProducts.css'

const api_url = "https://smallbasketapi.onrender.com";

const AllProducts=()=>{

    const [products,setProducts]=useState([])
    const [loading, setLoading] = useState(true);
    const [subcategoriesNames,setSubCategoriesNames]=useState([])

    let productsUrl=`${api_url}/products`

    useEffect(() => {
        axios.get(productsUrl)
          .then((res) => {
            setProducts(res.data);
            setLoading(false)
          });
    }, []);

    useEffect(() => {
        axios.get(`${api_url}/categories`)
          .then((res) => {
            setSubCategoriesNames(res.data);
            setLoading(false)
          });
    }, []);

    const handleFilter=(event)=>{
        setLoading(true)
        let sub_category_name=event.target.value;
        if(sub_category_name===""){
            productsUrl=`${api_url}/products`
        }
        else{
            productsUrl=`${api_url}/subcategories/${sub_category_name}`
        }

        axios.get(productsUrl)
        .then((res)=>{setProducts(res.data)})
        setLoading(false)
    }

    const handleCostFilter=(event)=>{
        setLoading(true)
        let cost=(event.target.value).split('-');
        let lowRange=cost[0];
        let highRange = cost[1];
        if(cost===""){
            productsUrl=`${api_url}/products`
        }
        else{
            productsUrl=`${api_url}/products?lowRange=${lowRange}&highRange=${highRange}`
        }

        axios.get(productsUrl)
        .then((res)=>{setProducts(res.data)})
        setLoading(false)
    }

    const renderCategories=((data)=>{
        return data.map((item)=>{
            return item.item_subcategories.map((item_subcategories)=>{
                return(
                    <>
                        <label className='radio d-block'>
                            <input className='me-3' type='radio' name='category' value={item_subcategories.sub_category_name}/>{item_subcategories.sub_category_name}
                        </label>
                    </>
                )
            })
        })
    })

    const renderProducts=((data)=>{
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
    })

    return(
        <>
            {loading ? (
                <div className="container d-flex justify-content-center">
                    <img src="/loader.gif" alt="loading"></img>
                </div>
            ) : (
                <div className='container-fluid'>
                    <div className='row d-flex justify-content-evenly mt-5 mb-5'>
                        <div className='col-3'>
                            <h4 className='text-center text-danger'><em>Customize Your Grocery Hunt</em></h4>
                            <hr></hr>
                            <div className='container'>
                                <h6 className=' mb-2'>Based on Cost</h6>
                                <div onChange={handleCostFilter} className=''>
                                    <label className='radio d-block'>
                                        <input className='me-3' type='radio' name='category' value='1-30'/>0-30
                                    </label>
                                    <label className='radio d-block'>
                                        <input className='me-3' type='radio' name='category' value='30-50'/>30-50
                                    </label>
                                    <label className='radio d-block'>
                                        <input className='me-3' type='radio' name='category' value='50-100'/>50-100
                                    </label>
                                    <label className='radio d-block'>
                                        <input className='me-3' type='radio' name='category' value='100-200'/>100-200
                                    </label>
                                    <label className='radio d-block'>
                                        <input className='me-3' type='radio' name='category' value='200-300'/>200-300
                                    </label>
                                    <label className='radio d-block'>
                                        <input className='me-3' type='radio' name='category' value='300-400'/>300-400
                                    </label>
                                    <label className='radio d-block'>
                                        <input className='me-3' type='radio' name='category' value='400-10000000'/>400 and Above
                                    </label>
                                </div>
                                <hr></hr>
                                <h6 className=' mb-2'>Based on Categories</h6>
                                <div onChange={handleFilter} className=''>
                                    <label className='radio d-block'>
                                        <input defaultChecked className='me-3' type='radio' name='category' value=''/>All
                                    </label>
                                    {renderCategories(subcategoriesNames)}
                                </div>
                            </div>
                        </div>
                        <div className='col-8'>
                            <div className="row d-flex justify-content-center">
                                {renderProducts(products)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AllProducts