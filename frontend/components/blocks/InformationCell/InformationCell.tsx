import styled from "styled-components";
import formatHTML from "../../../utils/formatHTML";
import Dots from "../../svgs/Dots";
import pxToRem from "../../../utils/pxToRem";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const InformationCellWrapper = styled(motion.div)`
  pointer-events: all;

  &:hover {
    color: var(--colour-black);
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Snippet = styled(motion.div)``;

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

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background-color: #e6e6e6;
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
};

const InformationCell = (props: Props) => {
  const { informationSnippet, moreInformation } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <InformationCellWrapper
      className="cell"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Inner>
        <Snippet
          dangerouslySetInnerHTML={{ __html: formatHTML(informationSnippet) }}
        />
        <AnimatePresence>
          {isHovered && !isOpen && (
            <MoreTrigger
              variants={triggerWrapperVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(!isOpen)}
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
          {isOpen && (
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
