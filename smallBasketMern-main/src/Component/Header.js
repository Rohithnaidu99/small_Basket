import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const api_url = "https://smallbasketapi.onrender.com";

const Header = () => {

    const darkMode = (event) => {
        let myBody = document.body;

        myBody.classList.toggle("bg-dark");
        myBody.classList.toggle("text-white");

        let spanELements = document.getElementsByTagName("span");

        let aELements = document.getElementsByTagName("a");

        let pELements = document.getElementsByTagName("p");

        let navbarscrollList = document.getElementById("navbarScroll");

        let navbarul = navbarscrollList.getElementsByTagName("ul");

        if (myBody.classList.contains("bg-dark")) {
            document.getElementById("logoToggle").src =
                "https://i.ibb.co/XZVSChk/clipboard.png";

            document.getElementById("darkModeButton").classList.add("text-white");

            document.getElementById("navbar2List").classList.add("text-white");

            document.getElementById("navbar1List").classList.add("text-white");

            for (var i = 0; i < spanELements.length; i++) {
                spanELements[i].classList.remove("text-dark");
                spanELements[i].classList.add("text-white");
            }

            for (var j = 0; j < aELements.length; j++) {
                aELements[j].classList.remove("text-dark");
                aELements[j].classList.add("text-white");
            }

            for (var k = 0; k < pELements.length; k++) {
                pELements[k].classList.remove("text-dark");
                pELements[k].classList.add("text-white");
            }

            for (var l = 0; l < navbarul.length; l++) {
                navbarul[l].classList.add("bg-dark");
            }
        } else {
            document.getElementById("logoToggle").src =
                "https://i.ibb.co/GJTnmbz/image.png";

            document.getElementById("darkModeButton").classList.remove("text-white");

            document.getElementById("navbar2List").classList.remove("text-white");

            document.getElementById("navbar1List").classList.remove("text-white");

            for (var m = 0; m < spanELements.length; m++) {
                spanELements[m].classList.remove("text-white");
                spanELements[m].classList.add("text-dark");
            }

            for (var n = 0; n < aELements.length; n++) {
                aELements[n].classList.remove("text-white");
                aELements[n].classList.add("text-dark");
            }

            for (var p = 0; p < pELements.length; p++) {
                pELements[p].classList.remove("text-white");
                pELements[p].classList.add("text-dark");
            }

            for (var q = 0; q < navbarul.length; q++) {
                navbarul[q].classList.remove("bg-dark");
            }
        }

        let darkIcon = document.getElementById("darkModeButton");

        if (darkIcon.classList.contains("bi-toggle-off")) {
            document.getElementById("darkModeButton").classList.add("bi-toggle-on");

            document.getElementById("darkModeButton").classList.remove("bi-toggle-off");
        } else {
            document.getElementById("darkModeButton").classList.add("bi-toggle-off");

            document.getElementById("darkModeButton").classList.remove("bi-toggle-on");
        }
    }

    const [categories, setCategories] = useState("");

    useEffect(() => {
        fetch(`${api_url}/categories`, { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
            });
    }, [])

    const renderCategories = (data) => {
        if (data) {
            return data.map((item) => {
                return (
                    <li key={item.category_id} className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle text-dark"
                            href="#"
                            id="navbarScrollingDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {item.category_name}
                        </a>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="navbarScrollingDropdown"
                        >
                            {item.item_subcategories.map(subcategory => (
                                <li key={subcategory.sub_category_id}>
                                    <Link to={`/subcategories/${subcategory.sub_category_name}`} className="dropdown-item">
                                        {subcategory.sub_category_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                );
            })
        }
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-xl shadow-sm" id="navbar1">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img
                                className="img"
                                src="https://i.ibb.co/GJTnmbz/image.png"
                                alt="smallbasket"
                                id="logoToggle"
                            />
                        </Link>
                        <div className="d-flex text-center">
                            <Link className="nav-link" to="/myBasket">
                                <i className="bi bi-basket text-danger fs-5" id="cartLogo"></i>
                                <span className="text-dark fs-5 ms-2">Basket</span>
                            </Link>
                        </div>
                        <div className="d-flex text-center">
                            <Link className="nav-link" to="/allOrders">
                                <i className="bi bi-receipt-cutoff text-danger fs-5" id="cartLogo"></i>
                                <span className="text-dark fs-5 ms-2">Orders</span>
                            </Link>
                        </div>
                        <div className="ms-3 me-5" id="darkModeTextButton">
                            <a href="#" className="text-dark" onClick={darkMode}>
                                <i id="darkModeButton" className="bi bi-toggle-off fs-3"></i>
                            </a>
                        </div>
                        <button
                            className="navbar-toggler shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#mynavbar"
                        >
                            <i className="bi bi-list" id="navbar1List"></i>
                        </button>
                        <div className="collapse navbar-collapse mx-auto" id="mynavbar">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <hr></hr>
                                <li className="nav-item searchBar ms-3">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control shadow-none"
                                            placeholder="Looking for a specific item? Search our store now!"
                                        />
                                        <button className="input-group-text">
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="nav-item ms-4">
                                    <div className="mt-3" id="geoLocationName">
                                        <i className="bi bi-geo-alt-fill text-danger fs-5 ms-2"></i>
                                        <span className="fs-6 ms-2" id="locationNameNavBar">Location</span>
                                    </div>
                                </li>
                                <li className="nav-item ms-4">
                                    <div className="d-flex text-center">
                                        <div className="customSize">
                                            <img
                                                className="h-100 w-100"
                                                id="tempIcon"
                                                src="https://i.ibb.co/3MQbjB0/image.png"
                                                alt="TempImage"
                                                border="0"
                                            />
                                        </div>
                                        <span className="text-center fs-6 mt-3" id="temperatureText">--</span>
                                    </div>
                                </li>
                                {/* <li className="nav-item ms-5">
                                    <div className="d-flex text-center">
                                        <a className="nav-link" href="">
                                            <i className="bi bi-box-arrow-in-right text-danger fs-5"></i>
                                            <span className="text-dark fs-5">SignIn</span>
                                        </a>
                                    </div>
                                </li>
                                <li className="nav-item ms-5">
                                    <div className="d-flex text-center">
                                        <a className="nav-link" href="">
                                            <i className="bi bi-person-fill text-danger fs-5"></i>
                                            <span className="fs-5 text-dark">SignUp</span>
                                        </a>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
                <nav className="navbar navbar-expand-xxl shadow-sm" id="navbar2">
                    <div className="container">
                        <span className="navbar-brand">Shop By Category:</span>
                        <button
                            className="navbar-toggler shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarScroll"
                        >
                            <i className="bi bi-list" id="navbar2List"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                                <hr></hr>
                                {renderCategories(categories)}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;