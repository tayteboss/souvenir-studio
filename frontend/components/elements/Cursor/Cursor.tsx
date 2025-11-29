import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useMousePosition } from "../../../hooks/useMousePosition";
import Image from "next/image";

type Props = {
  cursorRefresh: () => void;
  appCursorRefresh: number;
};

type StyledProps = {
  $isActive?: boolean;
  $isOnDevice?: boolean;
  $rotation?: number;
  $autoWidth?: boolean;
};

const cursorImages: string[] = ["/images/cursor-1.png", "/images/cursor-2.png"];

const CursorWrapper = styled.div<StyledProps>`
  z-index: 1;
  position: fixed;
  display: ${(props) => (props.$isOnDevice ? "none" : "block")};

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    display: none;
  }
`;

const CursorFloatingButton = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -12.5vw;
  left: -12.5vw;
  height: 25vw;
  width: 25vw;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transform-origin: center left;

  transition:
    top 500ms ease,
    left 500ms ease,
    height 500ms ease,
    width 500ms ease,
    opacity 300ms ease;
`;

const Cursor = ({ cursorRefresh, appCursorRefresh }: Props) => {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isOnDevice, setIsOnDevice] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [cursorImageIndex, setCursorImageIndex] = useState<number>(0);
  const [cursorX, setCursorX] = useState<number>(0);
  const [cursorY, setCursorY] = useState<number>(0);
  const [hasInitialPosition, setHasInitialPosition] = useState<boolean>(false);

  const previousPosition = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const rotationTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastMoveTime = useRef<number>(Date.now());
  const resetDelay = 2000; // 0.2 seconds

  const router = useRouter();
  const position = useMousePosition();

  // Set initial cursor position to the center of the viewport on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setCursorX(centerX);
      setCursorY(centerY);
      setHasInitialPosition(true);
    }
  }, []);

  // Update cursor position when mouse moves
  useEffect(() => {
    if (position.x !== null && position.y !== null) {
      setCursorX(position.x);
      setCursorY(position.y);
    }
  }, [position.x, position.y]);

  const ROTATION_SENSITIVITY = 0.2; // Adjust this value to control the tilt amount
  const RETURN_SPEED = 5; // Adjust this value to control how quickly it returns to level
  const STOP_DELAY = 500; // Adjust the delay (in milliseconds) before resetting rotation

  const calculateRotation = () => {
    const deltaX = cursorX - previousPosition.current.x;
    const deltaY = cursorY - previousPosition.current.y;

    // Check if there's any significant movement
    if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
      isMoving.current = true;
      clearTimeout(rotationTimeout.current as NodeJS.Timeout); // Clear any pending reset

      let targetRotation = 0;

      if (deltaY < 0) {
        // Moving up, tilt right
        targetRotation = deltaX * ROTATION_SENSITIVITY + 8;
      } else if (deltaY > 0) {
        // Moving down, tilt left
        targetRotation = deltaX * ROTATION_SENSITIVITY - 8;
      } else {
        // No vertical movement, base rotation on horizontal movement
        targetRotation = deltaX * ROTATION_SENSITIVITY;
      }

      // Smoothly return to level
      setRotation((prevRotation) => {
        const diff = targetRotation - prevRotation;
        return prevRotation + diff / RETURN_SPEED;
      });
    } else {
      // Cursor has stopped (or very little movement)
      // Set a timeout to reset the rotation after a short delay
      clearTimeout(rotationTimeout.current as NodeJS.Timeout);
      rotationTimeout.current = setTimeout(() => {
        setRotation(0);
        isMoving.current = false;
      }, STOP_DELAY);
    }

    previousPosition.current = { x: cursorX, y: cursorY };
  };

  const variantsWrapper = {
    visible: {
      x: cursorX,
      y: cursorY,
      rotate: rotation,
      transition: {
        type: "spring",
        mass: 0.01,
        stiffness: 100,
        damping: 5,
        overshootClamping: false,
        restDelta: 0.01,
        ease: "linear",
      },
    },
    hidden: {
      x: cursorX,
      y: cursorY,
      transition: {
        type: "spring",
        mass: 0.01,
        stiffness: 100,
        damping: 5,
        overshootClamping: false,
        restDelta: 0.01,
        ease: "linear",
      },
    },
  };

  const clearCursor = () => {
    setIsHoveringLink(false);
    setRotation(0);
    setIsOnDevice(false);
  };

  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 1.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.05,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.05,
        ease: "easeIn",
      },
    },
  };

  // Cycle cursor image on each click, looping through all available images
  useEffect(() => {
    const handleClick = () => {
      setCursorImageIndex((prevIndex) => (prevIndex + 1) % cursorImages.length);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("click", handleClick);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("click", handleClick);
      }
    };
  }, []);

  const findActions = () => {
    const aLinks = document.querySelectorAll("a");
    const cursorLinks = document.querySelectorAll(".cursor-link");

    // cursorLinks.forEach((link) => {
    //   link.addEventListener("mouseenter", () => {
    //     setIsHoveringLink(true);
    //   });
    //   link.addEventListener("mouseleave", () => {
    //     setIsHoveringLink(false);
    //     setRotation(0); // Reset rotation on leave
    //   });
    // });

    // aLinks.forEach((link) => {
    //   link.addEventListener("mouseenter", () => {
    //     setIsHoveringLink(true);
    //   });
    //   link.addEventListener("mouseleave", () => {
    //     setIsHoveringLink(false);
    //     setRotation(0); // Reset rotation on leave
    //   });
    // });

    // checking if on a device
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      setIsOnDevice(true);
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      setIsOnDevice(true);
    }
  };

  useEffect(() => {
    findActions();

    const timer = setTimeout(() => {
      findActions();
    }, 1000);

    return function cleanUp() {
      clearCursor();
      clearTimeout(timer);
    };
  }, [cursorRefresh, appCursorRefresh]);

  useEffect(() => {
    calculateRotation();
  }, [cursorX, cursorY]);

  // reset cursor on page change
  useEffect(() => {
    clearCursor();
    setRotation(0); // Reset rotation on page change
  }, [router.pathname, router.asPath, router.query.slug, cursorRefresh]);

  return (
    <>
      {hasInitialPosition && (
        <CursorWrapper $isOnDevice={isOnDevice} className="cursor-wrapper">
          <CursorFloatingButton
            $isActive={isHoveringLink}
            variants={variantsWrapper}
            animate="visible"
            layout
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={cursorImageIndex}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  src={cursorImages[cursorImageIndex]}
                  alt="Cursor"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="25vw"
                />
              </motion.div>
            </AnimatePresence>
          </CursorFloatingButton>
        </CursorWrapper>
      )}
    </>
  );
};

export default Cursor;
