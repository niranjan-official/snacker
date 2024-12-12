"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import ProductList from "./ProductList";
import { BsEmojiFrown } from "react-icons/bs";
import { BsEmojiFrownFill } from "react-icons/bs";

const ProductSection = ({ products }) => {
  const [productList, setProductList] = useState(products);
  return (
    <div className="mt-4 flex w-full flex-col">
      <SearchBar products={products} setProductList={setProductList} />
      <Sort products={products} setProductList={setProductList} />
      <p className="mt-4 text-sm italic text-primary/50">
        It is recommended to place your order in front of the machine.
      </p>
      {products.length > 0 ? (
        <ProductList products={productList} />
      ) : (
        <div className="flex w-full flex-col items-center pt-16 text-primary/50">
          <BsEmojiFrownFill size={80} />
          <p className="mt-2 text-center text-2xl font-extrabold">
            Oops! Shelf is Empty
          </p>
          <p className="text-center leading-5">
            It seems there’s nothing here at the moment. Check back later!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductSection;
