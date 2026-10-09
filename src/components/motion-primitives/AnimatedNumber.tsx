import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  decimals?: number;
}

export function AnimatedNumber({
  value,
  className = '',
  springOptions = { mass: 0.8, stiffness: 75, damping: 15 },
  decimals = 0,
}: AnimatedNumberProps) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) => current.toFixed(decimals));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={className}>{display}</motion.span>;
}
