import React from "react";
import Loading from "../../components/Loading";
import { Container, Card, Title, Author, Cover, StyledLink } from "./favorites.styles";

class Favorites extends React.Component {
  state = {
    data: {},
    isLoading: false,
  };

  fetchFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoritedBooks")) || {};
    this.setState({ data: favorites, isLoading: false });
  };

  componentDidMount() {
    this.fetchFavorite();
  }

  render() {
    return (
      <>
        {this.state.isLoading && <Loading />}
        {this.state.data && !this.state.isLoading && (
          <Container>
            {Object.entries(this.state.data).map((entry) => {
              // eslint-disable-next-line no-unused-vars
              const [key, value] = entry;
              return (
                <Card>
                  <StyledLink to={`/book/${value.id}`}>
                    <Title>{value.volumeInfo.title}</Title>
                    <Author>{value.volumeInfo.authors}</Author>
                    <Cover>
                      <img
                        src={value.volumeInfo.imageLinks.thumbnail}
                        alt={value.volumeInfo.title}
                      />
                    </Cover>
                  </StyledLink>
                </Card>
              );
            })}
          </Container>
        )}
      </>
    );
  }
}

export default Favorites;
