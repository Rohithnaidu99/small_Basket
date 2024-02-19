import React from 'react';
import './ImageCarousel.css'

const ImageCarousel = () =>{
    return(
        <>
            <div className="container-fluid mt-3">
                <div
                    id="mainCarousel"
                    className="carousel carousel-dark slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#mainCarousel"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#mainCarousel"
                        data-bs-slide-to="1"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#mainCarousel"
                        data-bs-slide-to="2"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#mainCarousel"
                        data-bs-slide-to="3"
                        aria-label="Slide 3"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#mainCarousel"
                        data-bs-slide-to="4"
                        aria-label="Slide 4"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#mainCarousel"
                        data-bs-slide-to="5"
                        aria-label="Slide 5"
                    ></button>
                    </div>
                    <div className="carousel-inner">
                    <div className="carousel-item active carousel-custom-height">
                        
                        <img
                            className="d-block w-100 h-100"
                            src="https://i.ibb.co/7Yy4xgt/image.png"
                            alt="carousel-image-1"
                        />
                        
                    </div>
                    <div className="carousel-item carousel-custom-height">
                        
                        <img
                            className="d-block w-100 h-100"
                            src="https://i.ibb.co/fDW0qpJ/image.png"
                            alt="carousel-image-2"
                        />
                        
                    </div>
                    <div className="carousel-item carousel-custom-height">
                        
                        <img
                            className="d-block w-100 h-100"
                            src="https://i.ibb.co/BzV8NDJ/image.png"
                            alt="carousel-image-3"
                        />
                        
                    </div>
                    <div className="carousel-item carousel-custom-height">
                        
                        <img
                            className="d-block w-100 h-100"
                            src="https://i.ibb.co/cJjyXy1/image.png"
                            alt="carousel-image-4"
                        />
                        
                    </div>
                    <div className="carousel-item carousel-custom-height">
                        
                        <img
                            className="d-block w-100 h-100"
                            src="https://i.ibb.co/ZWHXcTt/image.png"
                            alt="carousel-image-5"
                        />
                        
                    </div>
                    <div className="carousel-item carousel-custom-height">
                        
                        <img
                            className="d-block w-100 h-100"
                            src="https://i.ibb.co/s9x7MQM/image.png"
                            alt="carousel-image-6"
                        />
                        
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#mainCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#mainCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageCarousel;