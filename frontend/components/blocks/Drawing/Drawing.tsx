import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const DrawingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 48px;
  height: 48px;
  background: black;
  border-radius: 50%;
  pointer-events: none;
`;

type DroppedCircle = {
  id: number;
  x: number;
  y: number;
};

const Drawing = () => {
  const [circles, setCircles] = useState<DroppedCircle[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const MIN_DISTANCE = 60; // Increased minimum distance between circles

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 24; // Adjusted for new circle size (48/2)
    const y = e.clientY - rect.top - 24; // Adjusted for new circle size (48/2)

    // Calculate distance from last circle
    const dx = x - lastPositionRef.current.x;
    const dy = y - lastPositionRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only add new circle if we've moved far enough
    if (distance >= MIN_DISTANCE) {
      const newCircle: DroppedCircle = {
        id: Date.now(),
        x,
        y,
      };

      setCircles((prev) => [...prev, newCircle]);
      lastPositionRef.current = { x, y };
    }
  }, []);

  return (
    <DrawingWrapper ref={wrapperRef} onMouseMove={handleMouseMove}>
      <AnimatePresence>
        {circles.map((circle) => (
          <Circle
            key={circle.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ left: circle.x, top: circle.y }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </AnimatePresence>
    </DrawingWrapper>
  );
};

export default Drawing;
