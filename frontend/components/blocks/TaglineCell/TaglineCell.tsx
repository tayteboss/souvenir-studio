import styled from "styled-components";
import formatHTML from "../../../utils/formatHTML";
import Link from "next/link";
import pxToRem from "../../../utils/pxToRem";

const TaglineCellWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${pxToRem(4)};
  pointer-events: all;

  &:hover {
    color: var(--colour-black);

    a {
      color: var(--colour-black);
    }
  }
`;

const TitleWrapper = styled.div``;

const Title = styled.div``;

const LinksWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  a {
    text-align: right;
    text-decoration: none;

    transition: all var(--transition-speed-default) var(--transition-ease);

    &:hover {
      color: #808080;
    }
  }
`;

type Props = {
  title: string;
  instagramHandle: string;
  instagramUrl: string;
  email: string;
};

const TaglineCell = (props: Props) => {
  const { title, instagramHandle, instagramUrl, email } = props;
  return (
    <TaglineCellWrapper className="cell">
      <TitleWrapper>
        <Title dangerouslySetInnerHTML={{ __html: formatHTML(title) }} />
      </TitleWrapper>
      <LinksWrapper>
        {instagramUrl && (
          <Link href={instagramUrl} target="_blank">
            @{instagramHandle}
          </Link>
        )}
        {email && <Link href={`mailto:${email}`}>{email}</Link>}
      </LinksWrapper>
    </TaglineCellWrapper>
  );
};

export default TaglineCell;
