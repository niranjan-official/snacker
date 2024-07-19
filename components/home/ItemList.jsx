"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import FoodItem from "./FoodItem";

const ItemList = ({ products }) => {
  const [productList, setProductList] = useState(products);
  return (
    <div className="mt-4 flex w-full flex-col">
      <SearchBar products={products} setProductList={setProductList} />
      <Sort products={products} setProductList={setProductList} />
      <p className="text-primary/50 text-sm italic mt-4">It is recommended to place your order in front of the machine.</p>
      <div className="mt-4 flex flex-wrap gap-4">
        {
            productList.map((product, index)=>(
                <FoodItem key={index} productId={product.id} name={product.name} price={product.price} stock={product.stock} imgSrc={product.imgSrc} />
            ))
        }
      </div>
    </div>
  );
};

export default ItemList;
