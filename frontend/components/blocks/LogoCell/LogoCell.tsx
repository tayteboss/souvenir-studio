import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const LogoCellWrapper = styled.div`
  transition: all var(--transition-speed-default) var(--transition-ease);
  border-top-left-radius: ${pxToRem(4)};
  border-top-right-radius: ${pxToRem(4)};
  pointer-events: all;

  &:hover {
    color: var(--colour-black);
  }
`;

const LogoCell = () => {
  return (
    <LogoCellWrapper className="cell">⋆˚✿˖ Souvenir Studio</LogoCellWrapper>
  );
};

export default LogoCell;
