import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import pxToRem from "../../../utils/pxToRem";

const InformationWrapper = styled.div`
  max-width: ${pxToRem(700)};
  grid-column: 3 / 7;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const Content = styled.div`
  margin-bottom: ${pxToRem(16)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    margin-bottom: ${pxToRem(8)};
  }

  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

type Props = {
  title: HomePageType["title"];
  instagramHandle: HomePageType["instagramHandle"];
  instagramUrl: HomePageType["instagramUrl"];
  email: HomePageType["email"];
  phone: HomePageType["phone"];
  moreInformation: HomePageType["moreInformation"];
};

const Information = (props: Props) => {
  const { instagramHandle, instagramUrl, email, phone, moreInformation } =
    props;

  return (
    <InformationWrapper>
      <Content>
        {moreInformation && <PortableText value={moreInformation} />}
      </Content>

      <LinksWrapper>
        {instagramUrl && (
          <Link href={instagramUrl} target="_blank">
            @{instagramHandle || ""}
          </Link>
        )}
        {email && <Link href={`mailto:${email}`}>{email || ""}</Link>}
        {phone && <Link href={`tel:${phone}`}>{phone || ""}</Link>}
      </LinksWrapper>
    </InformationWrapper>
  );
};

export default Information;
