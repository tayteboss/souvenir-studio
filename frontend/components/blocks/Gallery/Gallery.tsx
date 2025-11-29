import { useState, useEffect } from "react";
import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import Image from "next/image";

const GalleryWrapper = styled.div`
  grid-column: 8 / -1;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
    margin-top: auto;
  }
`;

const ImageOuter = styled.div`
  width: 100%;
  padding-top: 75%;
  position: relative;
`;

const ImageInner = styled.div<{ $isActive: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: opacity var(--transition-speed-default) var(--transition-ease);
`;

const Counter = styled.div`
  position: absolute;
  right: calc(100% + 16px);
  top: 0;
  white-space: nowrap;
`;

type Props = {
  images: HomePageType["images"];
};

const Gallery = (props: Props) => {
  const { images } = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        images.length ? (prevIndex + 1) % images.length : 0
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  const totalImages = images.length;

  return (
    <GalleryWrapper>
      <ImageOuter>
        {images.map((image, index) => (
          <ImageInner
            key={image.asset.url ?? index}
            $isActive={index === currentIndex}
          >
            <Image
              src={image.asset.url}
              alt={image.alt}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </ImageInner>
        ))}
        <Counter>
          {currentIndex + 1}/{totalImages}
        </Counter>
      </ImageOuter>
    </GalleryWrapper>
  );
};

export default Gallery;
