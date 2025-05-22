import styled from "styled-components";
import LogoCell from "../LogoCell";
import TaglineCell from "../TaglineCell";
import InformationCell from "../InformationCell";
import FooterCell from "../FooterCell";
import pxToRem from "../../../utils/pxToRem";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const MenuWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  pointer-events: none;
`;

const Inner = styled(motion.div)`
  pointer-events: all;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(4)};
  overflow: hidden;
  border-radius: ${pxToRem(4)};
`;

type Props = {
  title: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  informationSnippet: string;
  moreInformation: string;
};

const Menu = (props: Props) => {
  const {
    title,
    instagramHandle,
    instagramUrl,
    email,
    informationSnippet,
    moreInformation,
  } = props;

  const [windowHeight, setWindowHeight] = useState(0);
  const [isInformationOpen, setIsInformationOpen] = useState(false);

  const innerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const transform = useTransform(
    scrollY,
    [0, windowHeight],
    ["translateY(0%)", "translateY(50%)"]
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isInformationOpen]);

  return (
    <MenuWrapper style={{ transform }}>
      <Inner ref={innerRef} style={{ transform }}>
        <LogoCell
          windowHeight={windowHeight}
          scrollY={scrollY}
          instagramUrl={instagramUrl}
          email={email}
        />
        <TaglineCell
          title={title}
          instagramHandle={instagramHandle}
          instagramUrl={instagramUrl}
          email={email}
          windowHeight={windowHeight}
          scrollY={scrollY}
          innerRef={innerRef}
        />
        <InformationCell
          informationSnippet={informationSnippet}
          moreInformation={moreInformation}
          windowHeight={windowHeight}
          scrollY={scrollY}
          isInformationOpen={isInformationOpen}
          innerRef={innerRef}
          setIsInformationOpen={setIsInformationOpen}
        />
        <FooterCell
          windowHeight={windowHeight}
          scrollY={scrollY}
          innerRef={innerRef}
          isInformationOpen={isInformationOpen}
        />
      </Inner>
    </MenuWrapper>
  );
};

export default Menu;
