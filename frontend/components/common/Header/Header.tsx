import styled from "styled-components";
import { HomePageType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import Logo from "../../svgs/Logo/Logo";
import Information from "../../blocks/Information";
import LayoutGrid from "../../layout/LayoutGrid";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${pxToRem(12)} ${pxToRem(16)};
  z-index: 100;
  order: 1;
  mix-blend-mode: difference;
`;

const LogoWrapper = styled.div`
  grid-column: 1 / 4;

  svg {
    width: ${pxToRem(160)};
    height: auto;

    @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
      width: ${pxToRem(100)};
    }
  }
`;

const InformationTrigger = styled.button`
  grid-column: 9 / -1;
  text-align: right;
  order: 3;
  color: var(--colour-white);

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
    grid-column: 4 / -1;
    order: 2;
  }

  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  title: HomePageType["title"];
  instagramHandle: HomePageType["instagramHandle"];
  instagramUrl: HomePageType["instagramUrl"];
  email: HomePageType["email"];
  phone: HomePageType["phone"];
  moreInformation: HomePageType["moreInformation"];
  isInformationOpen: boolean;
  setIsInformationOpen: (isOpen: boolean) => void;
};

const Header = (props: Props) => {
  const {
    title,
    instagramHandle,
    instagramUrl,
    email,
    phone,
    moreInformation,
    isInformationOpen,
    setIsInformationOpen,
  } = props;

  return (
    <HeaderWrapper className="header">
      <LayoutGrid>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Information
          isOpen={isInformationOpen}
          title={title}
          instagramHandle={instagramHandle}
          instagramUrl={instagramUrl}
          email={email}
          phone={phone}
          moreInformation={moreInformation}
        />
        <InformationTrigger
          onClick={() => setIsInformationOpen(!isInformationOpen)}
        >
          {isInformationOpen ? "Close" : "Information"}
        </InformationTrigger>
      </LayoutGrid>
    </HeaderWrapper>
  );
};

export default Header;
