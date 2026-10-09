import React, { useRef } from 'react';
import { motion, useInView, Variant, Transition } from 'framer-motion';

type InViewProps = {
  children: React.ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: Parameters<typeof useInView>[1];
  className?: string;
  delay?: number;
};

export function InView({
  children,
  variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  transition = {
    type: 'spring',
    stiffness: 100,
    damping: 18,
    mass: 0.8,
  },
  viewOptions = { once: true, margin: '-60px' },
  className = '',
  delay = 0,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
