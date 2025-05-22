import styled from "styled-components";
import formatHTML from "../../../utils/formatHTML";
import Link from "next/link";
import pxToRem from "../../../utils/pxToRem";
import { MotionValue, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { throttle } from "lodash";

interface TaglineCellWrapperProps {
  $hasScrolled: boolean;
}

const TaglineCellWrapper = styled(motion.div)<TaglineCellWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${pxToRem(4)};
  pointer-events: ${(props) => (props.$hasScrolled ? "none" : "all")};
  position: relative;
  z-index: 3;

  transition: all var(--transition-speed-default) linear;

  a {
    pointer-events: all;
  }

  &:hover {
    color: var(--colour-black);

    a {
      color: var(--colour-black);
    }
  }
`;

const TitleWrapper = styled.div``;

const Title = styled.div`
  cursor: crosshair;
`;

const LinksWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  a {
    text-align: right;
    text-decoration: none;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      color: #808080;
    }
  }
`;

type Props = {
  title: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  windowHeight: number;
  scrollY: MotionValue<number>;
  innerRef: React.RefObject<HTMLDivElement>;
};

const TaglineCell = (props: Props) => {
  const {
    title,
    instagramHandle,
    instagramUrl,
    email,
    windowHeight,
    scrollY,
    innerRef,
  } = props;

  const cellRef = useRef<HTMLDivElement>(null);
  const [distanceFromTop, setDistanceFromTop] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

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

    calculateDistance();
    const timer = setTimeout(calculateDistance, 100);

    window.addEventListener("resize", calculateDistance);
    return () => {
      window.removeEventListener("resize", calculateDistance);
      clearTimeout(timer);
    };
  }, [innerRef]);

  const transform = useTransform(
    scrollY,
    [0, windowHeight],
    ["translateY(0%)", `translateY(-${distanceFromTop}px)`]
  );

  return (
    <TaglineCellWrapper
      ref={cellRef}
      className="cell"
      style={{
        transform,
      }}
      $hasScrolled={hasScrolled}
    >
      <TitleWrapper>
        <Title dangerouslySetInnerHTML={{ __html: formatHTML(title) }} />
      </TitleWrapper>
      <LinksWrapper>
        {instagramUrl && (
          <Link href={instagramUrl} target="_blank">
            @{instagramHandle}
          </Link>
        )}
        {email && <Link href={`mailto:${email}`}>{email}</Link>}
      </LinksWrapper>
    </TaglineCellWrapper>
  );
};

export default TaglineCell;
