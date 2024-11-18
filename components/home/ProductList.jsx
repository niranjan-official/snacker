import React from "react";
import FoodItem from "./FoodItem";

const ProductList = ({ products }) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {products?.map((product) => (
        <FoodItem
          key={product.id}
          productId={product.id}
          name={product.name}
          price={product.price}
          stock={product.stock}
          imgSrc={product.imgSrc}
          position={product.position}
        />
      ))}
    </div>
  );
};

export default ProductList;
