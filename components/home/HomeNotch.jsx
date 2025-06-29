'use client'
import React from "react";
import { motion } from "framer-motion";
import UserProfileButton from "./UserProfileButton";
import { HiViewGrid } from "react-icons/hi";
import CreditButton from "./CreditButton";
import InstallPWA from "../shared/InstallPWA";

const HomeNotch = ({ username, id }) => {

  return (
    <>
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
          >
            <HiViewGrid
              size={30}
              className="rounded-md bg-dark-100 p-1 text-primary"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <InstallPWA variant="banner" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <UserProfileButton />
        </motion.div>
      </motion.div>
      <motion.div 
        className="mt-6 flex w-full items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Hi{" "}
          <motion.span 
            className="capitalize"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.3, type: "spring" }}
          >
            {username}
            <motion.span 
              className="text-xl"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                delay: 1,
                duration: 0.6,
                ease: "easeInOut"
              }}
            >
              👋
            </motion.span>
          </motion.span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <CreditButton userId={id} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default HomeNotch;
