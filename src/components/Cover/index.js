import { StyledCover } from "./cover.styles";

const Cover = ({ coverUrl, title }) => {
  return (
    <StyledCover>
      <img src={coverUrl} alt={title} />
    </StyledCover>
  );
};

export default Cover;
