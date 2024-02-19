import React, { useState, useEffect } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

let navbarLocation;
let temperatureText;
let temperatureIcon;

window.onload = function geoLocation() {
    navbarLocation = document.getElementById("locationNameNavBar");
    temperatureText = document.getElementById("temperatureText");
    temperatureIcon = document.getElementById("tempIcon");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocation);
    }
};

function getLocation(data) {
    let latitude = data.coords.latitude;
    let longitude = data.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

    fetch(url, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
            let cityName = data.city.name;
            let country = data.city.country;
            let temperature = data.list[0].temp.day;
            let id = data.list[0].weather[0].id;

            navbarLocation.innerText = `${cityName}, ${country}`;

            temperatureText.innerText = `${temperature} °C`;

            if (id == 800) {
                temperatureIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
            }
            if (id == 801) {
                temperatureIcon.src = "https://openweathermap.org/img/wn/02d@2x.png";
            }
            if (id == 802) {
                temperatureIcon.src = "https://openweathermap.org/img/wn/03d@2x.png";
            }
            if (id == 803 || id == 804) {
                temperatureIcon.src = "https://openweathermap.org/img/wn/04d@2x.png";
            }
            if ((id >= 300 && id < 400) || (id >= 520 && id < 532)) {
                temperatureIcon.src = "https://openweathermap.org/img/wn/09d@2x.png";
            }
            if (id >= 500 && id < 505) {
                temperatureIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
            }
            if (id >= 200 && id < 300) {
                temperatureIcon.src = "https://openweathermap.org/img/wn/11d@2x.png";
            }
            if ((id >= 600 && id < 700) || id == 511) {
                temperatureIcon.src = "https://openweathermap.org/img/wn/13d@2x.png";
            }
            if (id >= 700 && id < 800) {
                temperatureIcon.src = "https://openweathermap.org/img/wn/50d@2x.png";
            }
        });
}

const api_url = "https://smallbasketapi.onrender.com";

const Footer = () => {
    const [categories, setCategories] = useState("");

    useEffect(() => {
        fetch(`${api_url}/categories`, { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            });
    }, []);

    const renderCategories = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <>
                        {item.item_subcategories.map(
                            (subcategory) => (
                                    <Link key={item.sub_category_name} to={`/subcategories/${subcategory.sub_category_name}`} className="text-dark text-decoration-none" href="#">
                                        {subcategory.sub_category_name}&nbsp;&#44;&nbsp;
                                    </Link>
                            )
                        )}
                    </>
                );
            });
        }
    };

    const [brands,setBrands] = useState("")

    useEffect(()=>{
        fetch(`${api_url}/brands`,{method:"GET"})
        .then((res)=>res.json())
        .then((data)=>{
            setBrands(data)
        })
    },[])

    const renderBrands = (data)=>{
        if(data){
            return data.map((item)=>{
                return(
                    <Link key={item.brand_name} to={`/brands/${item.brand_name}`} className="text-dark text-decoration-none">
                        {item.brand_name}&nbsp;&#44;&nbsp;
                    </Link>
                )
            })
        }
    }

    return (
        <>
            <footer>
                <hr className="hr" />
                <div className="container-fluid mt-5">
                    <div className="row text-center">
                        <div className="col m-auto mt-0">
                            <h5 className="">Small Basket</h5>
                            <ul className="nav flex-column footerLinks">
                                <li className="nav-item mb-2">
                                    <Link to="/" className="nav-link p-0 text-dark">
                                        About Us
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/" className="nav-link p-0 text-dark">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/" className="nav-link p-0 text-dark">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/" className="nav-link p-0 text-dark">
                                        Careers at Small Basket
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col m-auto mt-0">
                            <h5 className="">Help</h5>
                            <ul className="nav flex-column footerLinks">
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-dark">
                                        FAQs
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-dark">
                                        Contact Us
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-dark">
                                        Vendor Connect
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col m-auto mt-0">
                            <h5 className="">Get Social With Us</h5>
                            <div className="d-flex justify-content-center">
                                <a href="https://www.linkedin.com/" target="_blank" className="nav-link p-0 text-dark me-3">
                                    <i className="bi bi-linkedin fs-4"></i>
                                </a>
                                <a href="https://www.twitter.com/" target="_blank" className="nav-link p-0 text-dark me-3">
                                    <i className="bi bi-twitter fs-4"></i>
                                </a>
                                <a href="https://www.facebook.com/" target="_blank" className="nav-link p-0 text-dark me-3">
                                    <i className="bi bi-facebook fs-4"></i>
                                </a>
                                <a href="https://www.instagram.com/" target="_blank" className="nav-link p-0 text-dark me-3">
                                    <i className="bi bi-instagram fs-4"></i>
                                </a>
                                <a href="https://www.whatsapp.com/" target="_blank" className="nav-link p-0 text-dark">
                                    <i className="bi bi-whatsapp fs-4"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="hr" />
                <div className="container-fluid">
                    <div className="d-flex justify-content-center">
                        <h5>Popular Categories:</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="footerLinks text-center">{renderCategories(categories)}</p>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-center">
                        <h5>Popular Brands:</h5>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="footerLinks text-center">
                            {renderBrands(brands)}
                        </p>
                    </div>
                </div>
                <hr className="hr" />
                <div className="text-center">
                    <p>&#169; Small Basket, All Rights Reserved</p>
                    <p>
                        Website Developed By{" "}
                        <span className="h6">Rohith</span>
                    </p>
                    <p className="small">
                        <strong>Tools Used :</strong> HTML5, CSS, Bootstrap5, JavaScript, NodeJS, ReactJS, Express, MongoDB
                    </p>
                    <div className="d-flex justify-content-center mb-5">
                        <a
                            href="https://www.linkedin.com/in/rohith-naidu-7266191a0/"
                            target="_blank"
                            className="nav-link p-0 text-dark me-3"
                        >
                            <i className="bi bi-linkedin fs-4"></i>
                        </a>
                        <a
                            href="https://github.com/Rohithnaidu99"
                            target="_blank"
                            className="nav-link p-0 text-dark me-3"
                        >
                            <i className="bi bi-github fs-4"></i>
                        </a>
                    </div>
                </div>
            </footer>
            {/* <script>
            $(document).ready(function (){$("#couponCodes").modal("show")});
            </script> */}
        </>
    );
};

export default Footer;
