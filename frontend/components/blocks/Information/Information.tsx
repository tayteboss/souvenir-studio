import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import pxToRem from "../../../utils/pxToRem";

const InformationWrapper = styled.div`
  max-width: ${pxToRem(700)};
  grid-column: 3 / 7;
  position: relative;
  z-index: 1;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

const InformationHoverWrapper = styled.div`
  max-width: ${pxToRem(700)};
  grid-column: 3 / 7;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  pointer-events: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 1 / -1;
  }

  .hide {
    opacity: 0;
  }

  .hover-show {
    opacity: 0;
    pointer-events: all;

    &:hover {
      opacity: 1;
    }
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
    <>
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
        {/* <InformationHoverWrapper>
          <Content className="hide">
            {moreInformation && <PortableText value={moreInformation} />}
          </Content>

          <LinksWrapper>
            {instagramUrl && (
              <Link href={instagramUrl} target="_blank" className="hover-show">
                @{instagramHandle || ""}
              </Link>
            )}
            {email && (
              <Link href={`mailto:${email}`} className="hover-show">
                {email || ""}
              </Link>
            )}
            {phone && (
              <Link href={`tel:${phone}`} className="hover-show">
                {phone || ""}
              </Link>
            )}
          </LinksWrapper>
        </InformationHoverWrapper> */}
      </InformationWrapper>
    </>
  );
};

export default Information;
