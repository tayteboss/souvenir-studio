import styled from "styled-components";
import LogoCell from "../LogoCell";
import TaglineCell from "../TaglineCell";
import InformationCell from "../InformationCell";
import FooterCell from "../FooterCell";
import pxToRem from "../../../utils/pxToRem";

const MenuWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  pointer-events: none;
`;

const Inner = styled.div`
  pointer-events: all;
  display: flex;
  flex-direction: column;
  gap: ${pxToRem(4)};
`;

type Props = {
  title: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
  informationSnippet: string;
  moreInformation: string;
};

const Menu = (props: Props) => {
  const {
    title,
    instagramHandle,
    instagramUrl,
    email,
    informationSnippet,
    moreInformation,
  } = props;
  return (
    <MenuWrapper>
      <Inner>
        <LogoCell />
        <TaglineCell
          title={title}
          instagramHandle={instagramHandle}
          instagramUrl={instagramUrl}
          email={email}
        />
        <InformationCell
          informationSnippet={informationSnippet}
          moreInformation={moreInformation}
        />
        <FooterCell />
      </Inner>
    </MenuWrapper>
  );
};

export default Menu;
