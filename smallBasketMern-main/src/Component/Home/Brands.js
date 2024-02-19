import React, { useState, useEffect } from "react";
import "./Brands.css";
import {Link} from 'react-router-dom';

const api_url = "https://smallbasketapi.onrender.com";

const Brands = () => {
    const [brands, setBrands] = useState("");

    useEffect(() => {
        fetch(`${api_url}/brands`, { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
                setBrands(data);
            });
    }, []);

    const renderBrands = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <div className="col-12 col-lg-2 col-md-4 col-sm-6 m-auto mt-3 shadow-sm brandsColDiv brandsImage">
                        <Link key={item.brand_name} to={`/brands/${item.brand_name}`}>
                            <img
                                className="h-100 w-100"
                                src={item.brand_image}
                                alt={item.brand_name}
                            />
                        </Link>
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
            <h5 className="text-center mt-3">Brands We Deliver</h5>
            <hr className="hr" />
            <div className="container shadow-sm brandsContainer">
                <div className="row m-auto">
                    {renderBrands(brands)}
                </div>
            </div>
        </>
    );
};

export default Brands;
