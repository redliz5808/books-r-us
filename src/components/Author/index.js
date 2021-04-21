import { StyledAuthor } from "./author.styles";

const Author = ({ authors }) => {
  const multipleAuthors = authors.map((author) => {
    return (
      <ul>
        <StyledAuthor>{author}</StyledAuthor>
      </ul>
    );
  });
  return (
    <>
      <StyledAuthor>
        <div>Author(s):</div>
        {multipleAuthors}
      </StyledAuthor>
    </>
  );
};

export default Author;
