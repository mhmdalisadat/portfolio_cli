// app/animations/MotionWrapper.tsx
"use client";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & MotionProps;

const MotionWrapper = ({ children, className, ...props }: Props) => (
  <motion.div className={className} {...props}>
    {children}
  </motion.div>
);

export default MotionWrapper;
