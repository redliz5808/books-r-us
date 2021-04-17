import { Container, Card, Genre, StyledLink, Cover, Title} from "./allBooks.styles";

const AllBooks = (props) => {
  const mappedBooks = props.data.map((book) => {
    return (
      <Card>
        <StyledLink to={`/book/${book.volumeInfo.industryIdentifiers[0].identifier}`}>
          <Title>{book.volumeInfo.title}</Title>
          <Cover>
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
          </Cover>
        </StyledLink>
      </Card>
    );
  });
  return (
    <Container>
      <Genre>{props.genre}</Genre>
      {mappedBooks}
    </Container>
  );
};

export default AllBooks;