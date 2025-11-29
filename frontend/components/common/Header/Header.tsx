import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import Information from "../../blocks/Information";
import LayoutGrid from "../../layout/LayoutGrid";
import Gallery from "../../blocks/Gallery";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${pxToRem(16)};
  z-index: 100;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    height: 100dvh;
    padding: ${pxToRem(8)};

    .layout-grid {
      height: 100%;
    }
  }
`;

const LogoWrapper = styled.div`
  grid-column: 1 / 3;

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    display: none;
  }
`;

type Props = {
  title: HomePageType["title"];
  instagramHandle: HomePageType["instagramHandle"];
  instagramUrl: HomePageType["instagramUrl"];
  email: HomePageType["email"];
  phone: HomePageType["phone"];
  moreInformation: HomePageType["moreInformation"];
  images: HomePageType["images"];
};

const Header = (props: Props) => {
  const {
    title,
    instagramHandle,
    instagramUrl,
    email,
    phone,
    moreInformation,
    images,
  } = props;

  return (
    <HeaderWrapper className="header">
      <LayoutGrid>
        <LogoWrapper>Souvenir</LogoWrapper>
        <Information
          title={title}
          instagramHandle={instagramHandle}
          instagramUrl={instagramUrl}
          email={email}
          phone={phone}
          moreInformation={moreInformation}
        />
        <Gallery images={images} />
      </LayoutGrid>
    </HeaderWrapper>
  );
};

export default Header;
