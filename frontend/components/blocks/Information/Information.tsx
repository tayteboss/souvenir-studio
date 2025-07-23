import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import pxToRem from "../../../utils/pxToRem";
import { AnimatePresence, motion } from "framer-motion";

const InformationWrapper = styled.div`
  max-width: ${pxToRem(700)};
  grid-column: 2 / 5;
  order: 2;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    order: 3;
    grid-column: 1 / -1;
    padding-top: ${pxToRem(16)};
  }
`;

const Title = styled.h1``;

const MoreInformationWrapper = styled(motion.div)``;

const MoreInformationInner = styled(motion.div)`
  padding-bottom: ${pxToRem(24)};

  a {
    color: var(--colour-blue);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${pxToRem(2)};
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
        {phone && <Link href={`tel:${phone}`}>{phone || ""}</Link>}
        <Spacer>—</Spacer>
        {email && <Link href={`mailto:${email}`}>{email || ""}</Link>}
      </LinksWrapper>
    </InformationWrapper>
  );
};

export default Information;
