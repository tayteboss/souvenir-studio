import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { motion, MotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";

const FooterCellWrapper = styled(motion.div)`
  width: ${pxToRem(330)};
  display: flex;
  gap: ${pxToRem(4)};
  position: relative;
  z-index: 1;

  transition: all var(--transition-speed-default) linear;
`;

const WorkTrigger = styled.button`
  padding: ${pxToRem(12)} ${pxToRem(16)};
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  color: #808080;
  flex: 3;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    color: var(--colour-white);
  }
`;

const StoreTrigger = styled.button`
  padding: ${pxToRem(12)} ${pxToRem(16)};
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  color: #808080;
  flex: 6;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    color: var(--colour-white);
  }
`;

type Props = {
  windowHeight: number;
  scrollY: MotionValue<number>;
  innerRef: React.RefObject<HTMLDivElement>;
  isInformationOpen: boolean;
};

const FooterCell = (props: Props) => {
  const { windowHeight, scrollY, innerRef, isInformationOpen } = props;
  const [distanceFromTop, setDistanceFromTop] = useState(0);
  const lenis = useLenis();

  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateDistance = () => {
      if (cellRef.current && innerRef.current) {
        const cellRect = cellRef.current.getBoundingClientRect();
        const innerRect = innerRef.current.getBoundingClientRect();
        setDistanceFromTop(cellRect.bottom - innerRect.top);
      }
    };

    // Calculate immediately
    calculateDistance();

    // Add a small delay to ensure the DOM has updated after the information opens/closes
    const timer = setTimeout(calculateDistance, 100);

    window.addEventListener("resize", calculateDistance);
    return () => {
      window.removeEventListener("resize", calculateDistance);
      clearTimeout(timer);
    };
  }, [innerRef, isInformationOpen]);

  const transform = useTransform(
    scrollY,
    [0, windowHeight],
    ["translateY(0%)", `translateY(-${distanceFromTop}px)`]
  );

  const handleScrollToWork = () => {
    lenis?.scrollTo(document.documentElement.scrollHeight, { duration: 1.2 });
  };

  return (
    <FooterCellWrapper
      ref={cellRef}
      style={{
        transform,
      }}
    >
      <WorkTrigger onClick={() => handleScrollToWork()}>Work</WorkTrigger>
      <StoreTrigger
        className="cursor-floating-button"
        data-cursor-title="Coming soon"
      >
        Souvenir Store
      </StoreTrigger>
    </FooterCellWrapper>
  );
};

export default FooterCell;
