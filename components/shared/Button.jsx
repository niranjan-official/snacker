import { cn } from "@/lib/utils";
import React from "react";
import { VscLoading } from "react-icons/vsc";

const Button = ({ children, loading = false, className, ...props }) => {
  return (
    <button
      disabled={loading}
      className={cn(
        "flex w-full items-center justify-center rounded-lg p-3 font-bold text-dark-200 shadow",
        className,
      )}
      {...props}
    >
      {loading ? (
        <VscLoading size={20} className="animate-spin text-dark-200/70" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
