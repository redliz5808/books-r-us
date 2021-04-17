import { StyledCover } from "./cover.styles";

const Cover = (props) => {
  return (
    <StyledCover>
      <img src={props.coverUrl} alt={props.title} />
    </StyledCover>
  );
};

export default Cover;
