import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import { useMousePosition } from "../../../hooks/useMousePosition";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const GalleryWrapper = styled(motion.div)<{ $isInformationOpen: boolean }>`
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  filter: ${({ $isInformationOpen }) =>
    $isInformationOpen ? "blur(10px)" : "none"};
  opacity: ${({ $isInformationOpen }) => ($isInformationOpen ? 0.8 : 1)};

  transition: all var(--transition-speed-slow) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    pointer-events: none;
    filter: ${({ $isInformationOpen }) =>
      $isInformationOpen ? "blur(10px)" : "none"};
    opacity: ${({ $isInformationOpen }) => ($isInformationOpen ? 0.5 : 1)};
  }
`;

const MotionImage = styled(motion.div)<{ top: string; left: string }>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: 60vw;
  overflow: hidden;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    width: 75vw;
  }
`;

const ImageOuter = styled.div`
  width: 100%;
  padding-top: 75%;
`;

const ImageInner = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

type Props = {
  images: HomePageType["images"];
  isInformationOpen: boolean;
};

const Gallery = (props: Props) => {
  const { images, isInformationOpen } = props;

  const { x } = useMousePosition();
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width > 0) {
      setIsMobile(width < 768);
    }
  }, [width]);

  // Slideshow logic for mobile
  useEffect(() => {
    if (!isMobile || images.length === 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isMobile, images.length]);

  const desktopIndex = useMemo(() => {
    if (isMobile || x === null || width === 0 || images.length === 0) {
      return -1;
    }
    const segmentWidth = width / images.length;
    return Math.min(Math.floor(x / segmentWidth), images.length - 1);
  }, [isMobile, x, width, images]);

  const finalIndex = isMobile ? activeIndex : desktopIndex;

  const position = useMemo(() => {
    return {
      top: `${Math.random() * (isMobile ? 70 : 40)}vh`,
      left: `${Math.random() * (isMobile ? 20 : 35)}vw`,
    };
  }, [finalIndex, isMobile]);

  if (finalIndex === -1 || !images[finalIndex]) {
    return null;
  }

  const variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <GalleryWrapper $isInformationOpen={isInformationOpen}>
      <AnimatePresence initial={false}>
        <MotionImage
          key={finalIndex}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          top={position.top}
          left={position.left}
        >
          <ImageOuter>
            <ImageInner>
              {images[finalIndex] && (
                <Image
                  src={images[finalIndex].asset.url}
                  alt={images[finalIndex].alt}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </ImageInner>
          </ImageOuter>
        </MotionImage>
      </AnimatePresence>
    </GalleryWrapper>
  );
};

export default Gallery;
