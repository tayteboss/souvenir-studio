import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { MotionValue, useTransform, motion } from "framer-motion";
import Link from "next/link";
import Insta from "../../svgs/Insta";
import Email from "../../svgs/Email";
import React from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

const LogoCellWrapper = styled(motion.div)<{ $isNearBottom: boolean }>`
  border-top-left-radius: ${pxToRem(4)};
  border-top-right-radius: ${pxToRem(4)};
  pointer-events: all;
  cursor: crosshair;
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.cell {
    background: ${(props) =>
      props.$isNearBottom ? "rgba(50, 50, 50, 1)" : "rgba(255, 255, 255, 0.5)"};

    backdrop-filter: ${(props) =>
      props.$isNearBottom ? "none" : "blur(20px)"};

    &:hover {
      background: ${(props) =>
        props.$isNearBottom
          ? "rgba(50, 50, 50, 1)"
          : "rgba(255, 255, 255, 0.9)"};
    }
  }

  transition: all var(--transition-speed-default) linear;

  &:hover {
    button {
      color: ${(props) =>
        props.$isNearBottom ? "var(--colour-white)" : "var(--colour-black)"};
    }

    svg {
      path {
        stroke: ${(props) =>
          props.$isNearBottom ? "var(--colour-white)" : "var(--colour-black)"};
      }
    }
  }

  button {
    color: ${(props) =>
      props.$isNearBottom ? "rgba(255, 255, 255, 0.5)" : "#808080"};

    &:hover {
      color: ${(props) =>
        props.$isNearBottom
          ? "rgba(255, 255, 255, 0.5)"
          : "var(--colour-black)"};
    }
  }

  a {
    &:hover {
      svg {
        path {
          stroke: ${(props) =>
            props.$isNearBottom ? "rgba(255, 255, 255, 0.5)" : "#808080"};
        }
      }
    }
  }

  svg {
    path {
      stroke: ${(props) =>
        props.$isNearBottom ? "rgba(255, 255, 255, 0.5)" : "#808080"};

      transition: all var(--transition-speed-default) linear;
    }
  }
`;

const Logo = styled.button`
  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const SocialIcons = styled.div<{ $isVisible: boolean }>`
  display: flex;
  gap: ${pxToRem(12)};
  align-items: center;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.2s ease;
`;

const SocialIcon = styled.div<{ $delay: string }>`
  opacity: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  transition:
    opacity 0.2s ease ${(props) => props.$delay},
    pointer-events 0s ${(props) => props.$delay};

  .is-visible & {
    opacity: 1;
    pointer-events: auto;
  }
`;

type Props = {
  windowHeight: number;
  scrollY: MotionValue<number>;
  instagramUrl: string;
  email: string;
};

const LogoCell = (props: Props) => {
  const { windowHeight, scrollY, instagramUrl, email } = props;

  const borderBottomLeftRadius = useTransform(
    scrollY,
    [0, windowHeight],
    [0, 4]
  );
  const borderBottomRightRadius = useTransform(
    scrollY,
    [0, windowHeight],
    [0, 4]
  );

  const [isNearBottom, setIsNearBottom] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const isBottom =
        document.documentElement.scrollHeight - scrollPosition <= 100;
      setIsNearBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lenis = useLenis();

  const handleScrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.2 });
  };

  return (
    <LogoCellWrapper
      className={`cell ${isNearBottom ? "is-visible" : ""}`}
      style={{ borderBottomLeftRadius, borderBottomRightRadius }}
      $isNearBottom={isNearBottom}
    >
      <Logo onClick={() => handleScrollToTop()}>⋆˚✿˖ Souvenir Studio</Logo>
      <SocialIcons $isVisible={isNearBottom}>
        <SocialIcon $delay="0.1s">
          <Link href={instagramUrl} target="_blank">
            <Insta />
          </Link>
        </SocialIcon>
        <SocialIcon $delay="0.1s">
          <Link href={`mailto:${email}`}>
            <Email />
          </Link>
        </SocialIcon>
      </SocialIcons>
    </LogoCellWrapper>
  );
};

export default LogoCell;
