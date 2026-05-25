import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const countRef = useRef(0);

  useEffect(() => {
    if (!inView) return;

    let startTime = null;
    const numericEnd = parseInt(end.toString().replace(/[^0-9]/g, ''), 10) || 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = percentage * (2 - percentage);
      const currentCount = Math.floor(easedProgress * numericEnd);

      setCount(currentCount);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(numericEnd);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  // Handle formats like "50+" or "5M+"
  const displayValue = `${prefix}${count.toLocaleString()}${suffix}`;

  return (
    <span ref={ref} className="font-accent text-4xl md:text-5xl lg:text-6xl text-secondary">
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
