import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import Home from './Home/Home'
import Main from './Main'
import ProductDisplay from './Listing/ProductDisplayLogic';
import SubCategoriesDetails from './CategoriesListing/subCategoriesDetails';
import BrandDetails from './CategoriesListing/brandDetails';
import BasketItems from './BasketList/myBasketView';
import OrderDetails from './Orders/OrderDetails';
import OrderSuccess from './Orders/OrderSuccess';
import AllOrders from './Orders/AllOrders';
import AllProducts from './AllProducts/AllProducts';

const Routing = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route index element={<Home />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="product-details/:id" element={<ProductDisplay />} />
                        <Route path="subcategories/:sub_category_name" element={<SubCategoriesDetails/>} />
                        <Route path="brands/:brand_name" element={<BrandDetails/>} />
                        <Route path="myBasket" element={<BasketItems/>}/>
                        <Route path="orderDetails" element={<OrderDetails/>}/>
                        <Route path="orderSuccess/:order_id" element={<OrderSuccess/>}/>
                        <Route path="allOrders" element={<AllOrders/>}/>
                        <Route path="allProducts" element={<AllProducts/>}/>
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Routing