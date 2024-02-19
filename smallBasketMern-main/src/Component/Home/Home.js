import React from 'react';
import ImageCarousel from './ImageCarousel';
import DealsOfTheDay from './DealsOfTheDay';
import Brands from './Brands';
import BankOffers from './BankOffers';

const Home = () =>{
    return(
        <>
            <ImageCarousel/>
            <DealsOfTheDay/>
            <Brands/>
            <BankOffers/>
        </>
    )
}

export default Home;