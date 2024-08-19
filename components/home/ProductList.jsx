import React from "react";
import FoodItem from "./FoodItem";

const ProductList = ({ products }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
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
