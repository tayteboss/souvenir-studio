import styled from "styled-components";
import { NextSeo } from "next-seo";
import { HomePageType, TransitionsType } from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import { homePageQueryString } from "../lib/sanityQueries";
import Projects from "../components/blocks/Projects";
import Drawing from "../components/blocks/Drawing";
import Menu from "../components/blocks/Menu";
import Miffy from "../components/blocks/Miffy";
import Gallery from "../components/blocks/Gallery";
import Header from "../components/common/Header";
import { useState } from "react";

const PageWrapper = styled(motion.div)``;

type Props = {
  data: HomePageType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { data, pageTransitionVariants } = props;
  const {
    seoTitle,
    seoDescription,
    title,
    instagramHandle,
    instagramUrl,
    email,
    moreInformation,
    images,
    phone,
  } = data;

  const [isInformationOpen, setIsInformationOpen] = useState(false);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={seoTitle || "Souvenir Studio"}
        description={seoDescription || ""}
      />
      <Header
        title={title}
        instagramHandle={instagramHandle}
        instagramUrl={instagramUrl}
        email={email}
        phone={phone}
        moreInformation={moreInformation}
        isInformationOpen={isInformationOpen}
        setIsInformationOpen={setIsInformationOpen}
      />
      <Gallery images={images} isInformationOpen={isInformationOpen} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(homePageQueryString);

  return {
    props: {
      data,
    },
  };
}

export default Page;
