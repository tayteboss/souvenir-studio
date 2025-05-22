import styled from "styled-components";
import formatHTML from "../../../utils/formatHTML";
import Dots from "../../svgs/Dots";
import pxToRem from "../../../utils/pxToRem";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useTransform,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { throttle } from "lodash";

interface InformationCellWrapperProps {
  $hasScrolled: boolean;
}

const InformationCellWrapper = styled(motion.div)<InformationCellWrapperProps>`
  position: relative;
  z-index: 2;
  pointer-events: ${(props) => (props.$hasScrolled ? "none" : "all")};

  &:hover {
    color: var(--colour-black);
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Snippet = styled(motion.div)`
  cursor: crosshair;
`;

const MoreTrigger = styled(motion.button)``;

const MoreTriggerInner = styled(motion.div)`
  padding-top: ${pxToRem(12)};
`;

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${pxToRem(2)};
  overflow: hidden;
  width: ${pxToRem(34)};
  position: relative;
  height: ${pxToRem(14)};
  background: #e6e6e6;
  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: var(--colour-black);

    svg {
      path {
        fill: var(--colour-white);
      }
    }
  }

  svg {
    path {
      transition: all var(--transition-speed-default) var(--transition-ease);
    }
  }
`;

const MoreInformationWrapper = styled(motion.div)``;

const MoreInformationInner = styled.div`
  padding-top: ${pxToRem(12)};
`;

const triggerWrapperVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "beforeChildren",
    },
  },
};

const infoWrapperVariants = {
  hidden: {
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  visible: {
    height: "auto",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "beforeChildren",
    },
  },
};

const innerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

type Props = {
  informationSnippet: string;
  moreInformation: string;
  windowHeight: number;
  scrollY: MotionValue<number>;
  isInformationOpen: boolean;
  setIsInformationOpen: (isInformationOpen: boolean) => void;
  innerRef: React.RefObject<HTMLDivElement>;
};

const InformationCell = (props: Props) => {
  const {
    informationSnippet,
    moreInformation,
    windowHeight,
    scrollY,
    isInformationOpen,
    innerRef,
    setIsInformationOpen,
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [distanceFromTop, setDistanceFromTop] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, []);

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

  return (
    <InformationCellWrapper
      ref={cellRef}
      className="cell"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{
        transform,
      }}
      $hasScrolled={hasScrolled}
    >
      <Inner>
        <Snippet
          dangerouslySetInnerHTML={{ __html: formatHTML(informationSnippet) }}
        />
        <AnimatePresence>
          {isHovered && !isInformationOpen && (
            <MoreTrigger
              variants={triggerWrapperVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsInformationOpen(!isInformationOpen)}
            >
              <MoreTriggerInner variants={innerVariants}>
                <DotsWrapper>
                  <Dots />
                </DotsWrapper>
              </MoreTriggerInner>
            </MoreTrigger>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isInformationOpen && (
            <MoreInformationWrapper
              variants={infoWrapperVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <MoreInformationInner>
                <Snippet
                  dangerouslySetInnerHTML={{
                    __html: formatHTML(moreInformation),
                  }}
                  variants={innerVariants}
                />
              </MoreInformationInner>
            </MoreInformationWrapper>
          )}
        </AnimatePresence>
      </Inner>
    </InformationCellWrapper>
  );
};

export default InformationCell;
