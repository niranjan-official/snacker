"use client";
import React, { useEffect, useState } from "react";

const Sort = ({ products, setProductList }) => {
  const [activeSort, setActiveSort] = useState("all");

  useEffect(() => {
    if (activeSort !== "all") {
      setProductList(
        products.filter((prod) => prod.category.toLowerCase() === activeSort),
      );
    } else {
      setProductList(products);
    }
  }, [activeSort]);

  return (
    <div className="mt-4 flex gap-3 text-sm font-medium text-primary">
      <button
        onClick={() => setActiveSort("all")}
        className={`rounded-lg p-1 px-4 shadow ${activeSort === "all" ? "bg-primary font-bold text-dark-200" : "bg-dark-100 text-primary"}`}
      >
        <h5>All List</h5>
      </button>
      <button
        onClick={() => setActiveSort("snacks")}
        className={`rounded-lg p-1 px-4 shadow ${activeSort === "snacks" ? "bg-primary font-bold text-dark-200" : "bg-dark-100 text-primary"}`}
      >
        <h5>Snacks</h5>
      </button>
      <button
        onClick={() => setActiveSort("drinks")}
        className={`rounded-lg p-1 px-4 shadow ${activeSort === "drinks" ? "bg-primary font-bold text-dark-200" : "bg-dark-100 text-primary"}`}
      >
        <h5>Drinks</h5>
      </button>
    </div>
  );
};

export default Sort;
