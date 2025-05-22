import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

const ProjectsWrapper = styled.div`
  padding-top: calc(100vh - 32px);
  position: relative;
  z-index: 2;
`;

const Inner = styled(motion.div)`
  background: var(--colour-black);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: calc(100vw - 48px);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  max-height: 80%;
  height: 80%;
  width: 80%;
`;

type Props = {
  data: HomePageType["images"];
};

const Projects = (props: Props) => {
  const { data } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const width = useTransform(
    scrollY,
    [0, windowHeight],
    [windowWidth - 48, windowWidth + 2]
  );

  const borderRadius = useTransform(scrollY, [0, windowHeight], [8, 0]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <ProjectsWrapper>
      <Inner style={{ width, borderRadius }}>
        <AnimatePresence>
          <ImageWrapper
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            <Image
              src={data[currentIndex].asset.url}
              alt="Project image"
              fill
              sizes="80vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </ImageWrapper>
        </AnimatePresence>
      </Inner>
    </ProjectsWrapper>
  );
};

export default Projects;
