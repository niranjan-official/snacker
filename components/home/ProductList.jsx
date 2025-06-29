import React from "react";
import { motion } from "framer-motion";
import FoodItem from "./FoodItem";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ProductList = ({ products }) => {
  return (
    <motion.div 
      className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products?.map((product, index) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { duration: 0.1 }
          }}
        >
          <FoodItem
            productId={product.id}
            name={product.name}
            price={product.price}
            stock={product.stock}
            imgSrc={product.imgSrc}
            position={product.position}
            subtitle={product.subtitle}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductList;
