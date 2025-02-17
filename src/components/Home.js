import React from 'react';
import Hero from "./Hero";
import ProductList from './ProductList';
import RatingProducts from './RatingProducts';

const Home = () => {
  return (
    <>
      <Hero />
      <ProductList />
      <RatingProducts />
    </>
  );
};

export default Home;
