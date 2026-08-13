"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

type Props = HTMLMotionProps<"button"> & {
  children?: React.ReactNode;
};

export default function CallButton({
  children = "Agenda tu llamada",
  className = "",
  ...rest
}: Props) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium tracking-[-0.005em] shadow-md transition-transform duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 1, y: 0 }}
      className={`${base} ${className}`}
      {...rest}
    >
      <span className="leading-none">{children}</span>
    </motion.button>
  );
}