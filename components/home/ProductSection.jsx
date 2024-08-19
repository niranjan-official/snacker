"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import ProductList from "./ProductList";

const ProductSection = ({ products }) => {
  
  const [productList, setProductList] = useState(products);
  return (
    <div className="mt-4 flex w-full flex-col">
      <SearchBar products={products} setProductList={setProductList} />
      <Sort products={products} setProductList={setProductList} />
      <p className="text-primary/50 text-sm italic mt-4">It is recommended to place your order in front of the machine.</p>
      <ProductList products={productList}/>
    </div>
  );
};

export default ProductSection;
