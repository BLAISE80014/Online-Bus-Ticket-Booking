import React from "react";
import Hero from "../hero/Hero";
import Search from "../search/Search";
import Category from "../category/Category";
import Offer from "../offer/Offer";

const HomeContainer = () => {
  return (
    <>
      <Hero />
      {/* Ongera ID kuri Search section kugirango button ijyane hano */}
      <div id="search-section">
        <Search />
      </div>
      <Category />
      <Offer />
    </>
  );
};

export default HomeContainer;
