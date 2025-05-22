import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const FooterCellWrapper = styled.div`
  width: ${pxToRem(330)};
  display: flex;
  gap: ${pxToRem(4)};
`;

const WorkTrigger = styled.button`
  padding: ${pxToRem(12)} ${pxToRem(16)};
  border-bottom-left-radius: ${pxToRem(4)};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  color: #808080;
  flex: 3;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    color: var(--colour-black);
  }
`;

const StoreTrigger = styled.button`
  padding: ${pxToRem(12)} ${pxToRem(16)};
  border-bottom-right-radius: ${pxToRem(4)};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  color: #808080;
  flex: 6;

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    color: var(--colour-black);
  }
`;

const FooterCell = () => {
  return (
    <FooterCellWrapper>
      <WorkTrigger>Work</WorkTrigger>
      <StoreTrigger
        className="cursor-floating-button"
        data-cursor-title="Coming soon"
      >
        Souvenir Store
      </StoreTrigger>
    </FooterCellWrapper>
  );
};

export default FooterCell;
