import styled from "styled-components";

const MiffyWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400 !important;
  font-family: serif !important;
`;

const Miffy = () => {
  return <MiffyWrapper>₍ᐢᐢ₎</MiffyWrapper>;
};

export default Miffy;
