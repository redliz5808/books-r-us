import { Container, Number } from "./pageNumbers.styles";

const PageNumbers = ({ handlePageClick }) => {
  const handleClick = (button) => {
    handlePageClick(button);
  };

  return (
    <Container>
      <Number onClick={() => handleClick("Previous")}>Previous</Number>
      <Number onClick={() => handleClick(1)}>1</Number>
      <Number onClick={() => handleClick(2)}>2</Number>
      <Number onClick={() => handleClick("Next")}>Next</Number>
    </Container>
  );
};

export default PageNumbers;
