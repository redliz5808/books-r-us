import unavailableCover from "../../assets/unavailableCover.png";
import {
  Container,
  Card,
  Genre,
  StyledLink,
  Cover,
  Title,
} from "./allBooks.styles";

const AllBooks = ({ data, genre }) => {
  const mappedBooks = data.map((book) => {
    let imageSrc = "";
    if (!book.volumeInfo.imageLinks) {
      imageSrc = unavailableCover;
    } else {
      imageSrc = book.volumeInfo.imageLinks.thumbnail;
    }
    return (
      <Card>
        <StyledLink
          to={`/book/${book.id}`}
        >
          <Title>{book.volumeInfo.title}</Title>
          <Cover>
            <img
              src={imageSrc}
              alt={book.volumeInfo.title}
            />
          </Cover>
        </StyledLink>
      </Card>
    );
  });

  return (
    <Container>
      <Genre>{genre}</Genre>
      {mappedBooks}
    </Container>
  );
};

export default AllBooks;
