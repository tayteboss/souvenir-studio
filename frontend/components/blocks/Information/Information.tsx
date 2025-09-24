import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import pxToRem from "../../../utils/pxToRem";
import { AnimatePresence, motion } from "framer-motion";

const InformationWrapper = styled.div`
  max-width: ${pxToRem(700)};
  grid-column: 4 / 9;
  order: 2;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    order: 3;
    grid-column: 1 / -1;
    padding-top: ${pxToRem(16)};
  }
`;

const Title = styled.h1`
  color: var(--colour-white);
`;

const MoreInformationWrapper = styled(motion.div)``;

const MoreInformationInner = styled(motion.div)`
  padding-bottom: ${pxToRem(24)};

  a {
    &:hover {
      text-decoration: underline;
      color: var(--colour-white);
    }
  }

  * {
    color: var(--colour-white);
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${pxToRem(2)};

  * {
    color: var(--colour-white);
  }
`;

const Spacer = styled.span``;

const wrapperVariants = {
  hidden: {
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  visible: {
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
    },
  },
};

const innerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  isOpen: boolean;
  title: HomePageType["title"];
  instagramHandle: HomePageType["instagramHandle"];
  instagramUrl: HomePageType["instagramUrl"];
  email: HomePageType["email"];
  phone: HomePageType["phone"];
  moreInformation: HomePageType["moreInformation"];
};

const Information = (props: Props) => {
  const {
    isOpen,
    title,
    instagramHandle,
    instagramUrl,
    email,
    phone,
    moreInformation,
  } = props;

  return (
    <InformationWrapper>
      <Title>{title || ""}</Title>
      <AnimatePresence>
        {isOpen && (
          <MoreInformationWrapper
            variants={wrapperVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <MoreInformationInner variants={innerVariants}>
              {moreInformation && <PortableText value={moreInformation} />}
            </MoreInformationInner>
          </MoreInformationWrapper>
        )}
      </AnimatePresence>
      <LinksWrapper>
        {email && <Link href={`mailto:${email}`}>{email || ""}</Link>}
        <Spacer>—</Spacer>
        {instagramUrl && (
          <Link href={instagramUrl} target="_blank">
            @{instagramHandle || ""}
          </Link>
        )}
      </LinksWrapper>
    </InformationWrapper>
  );
};

export default Information;
