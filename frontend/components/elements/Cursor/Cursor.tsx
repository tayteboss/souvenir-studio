import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useMousePosition } from "../../../hooks/useMousePosition";
import useViewportWidth from "../../../hooks/useViewportWidth";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
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

const cursorImages: string[] = [
  "/images/cursor-1.png",
  "/images/cursor-2.png",
  "/images/cursor-3.png",
  "/images/cursor-4.png",
  "/images/cursor-5.png",
  "/images/cursor-6.png",
  "/images/cursor-7.png",
  "/images/cursor-8.png",
  "/images/cursor-9.png",
  "/images/cursor-10.png",
  "/images/cursor-11.png",
  "/images/cursor-12.png",
  "/images/cursor-13.png",
];

const CursorWrapper = styled.div<StyledProps>`
  z-index: 5000;
  position: fixed;
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

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 50vw;
    height: 50vw;
    top: -25vw;
    left: -25vw;
  }

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
  const breakpoint = useViewportWidth();
  const { width, height } = useWindowDimensions();
  const isTabletPortrait = breakpoint === "tabletPortrait";
  const isMobile = breakpoint === "mobile";
  const [hasDismissedTabletCursor, setHasDismissedTabletCursor] =
    useState<boolean>(false);
  const [hasDismissedMobileCursor, setHasDismissedMobileCursor] =
    useState<boolean>(false);
  const [isMobileScreensaverActive, setIsMobileScreensaverActive] =
    useState<boolean>(false);
  const centerX = width / 2;
  const centerY = height / 2;
  const mobileInactivityTimeoutRef = useRef<number | null>(null);

  const router = useRouter();
  const position = useMousePosition();

  // Persist dismissal state for tablet portrait so it never shows again in this session.
  // Mobile cursor is NOT persisted so it can return later as a "screensaver".
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTablet = window.sessionStorage.getItem("tabletCursorDismissed");
    if (storedTablet === "true") {
      setHasDismissedTabletCursor(true);
    }
  }, []);

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
    if (isTabletPortrait) {
      // No rotation behaviour on tablet portrait – treat cursor as static loading image
      return;
    }

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

  // Helpers to manage mobile "screensaver" inactivity timer
  const clearMobileInactivityTimeout = () => {
    if (typeof window === "undefined") return;
    if (mobileInactivityTimeoutRef.current !== null) {
      window.clearTimeout(mobileInactivityTimeoutRef.current);
      mobileInactivityTimeoutRef.current = null;
    }
  };

  const startMobileInactivityTimeout = () => {
    if (!isMobile) return;
    if (typeof window === "undefined") return;

    clearMobileInactivityTimeout();

    mobileInactivityTimeoutRef.current = window.setTimeout(() => {
      // After 15s of inactivity on mobile, bring back the looping cursor
      // as a "screensaver" by marking it as not dismissed and active again.
      setHasDismissedMobileCursor(false);
      setIsMobileScreensaverActive(true);
    }, 15000);
  };

  const variantsWrapper = {
    visible: {
      x: isTabletPortrait ? centerX : cursorX,
      y: isTabletPortrait ? centerY : cursorY,
      rotate: isTabletPortrait ? 0 : rotation,
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
    if (typeof window === "undefined") return;

    const handleClick = () => {
      // On mobile:
      // - First click hides the initial loading cursor and starts an inactivity timer.
      // - After 15s of no clicks, the cursor returns as a "screensaver" and loops images.
      // - Clicking again hides it and restarts the inactivity timer.
      if (isMobile) {
        if (!hasDismissedMobileCursor || isMobileScreensaverActive) {
          setHasDismissedMobileCursor(true);
          setIsMobileScreensaverActive(false);
        }
        startMobileInactivityTimeout();
      } else if (isTabletPortrait) {
        if (!hasDismissedTabletCursor) {
          setHasDismissedTabletCursor(true);
          try {
            window.sessionStorage.setItem("tabletCursorDismissed", "true");
          } catch {
            // Ignore storage errors (e.g. disabled cookies)
          }
        }
      } else {
        // Desktop/other breakpoints retain existing behaviour – cycle cursor image on click
        setCursorImageIndex(
          (prevIndex) => (prevIndex + 1) % cursorImages.length
        );
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [
    isMobile,
    isTabletPortrait,
    hasDismissedMobileCursor,
    hasDismissedTabletCursor,
    isMobileScreensaverActive,
  ]);

  // On mobile breakpoint, automatically cycle through all cursor images
  // while the cursor is visible (initial loading or screensaver).
  useEffect(() => {
    if (!isMobile) return;
    if (hasDismissedMobileCursor) return;
    if (typeof window === "undefined") return;

    const intervalId = window.setInterval(() => {
      setCursorImageIndex((prevIndex) => (prevIndex + 1) % cursorImages.length);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isMobile, hasDismissedMobileCursor]);

  // Clear any pending mobile inactivity timer on unmount
  useEffect(() => {
    return () => {
      clearMobileInactivityTimeout();
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
  }, [cursorX, cursorY, isTabletPortrait]);

  // reset cursor on page change
  useEffect(() => {
    clearCursor();
    setRotation(0); // Reset rotation on page change
  }, [router.pathname, router.asPath, router.query.slug, cursorRefresh]);

  const shouldShowCursor =
    hasInitialPosition &&
    // On non-mobile / non-tabletPortrait, still respect isOnDevice (hide cursor on touch devices)
    ((!isMobile && !isTabletPortrait && !isOnDevice) ||
      isMobile ||
      isTabletPortrait) &&
    (!isTabletPortrait || (isTabletPortrait && !hasDismissedTabletCursor)) &&
    (!isMobile || (isMobile && !hasDismissedMobileCursor));

  return (
    <>
      {shouldShowCursor && (
        <CursorWrapper $isOnDevice={isOnDevice} className="cursor-wrapper">
          <CursorFloatingButton
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
