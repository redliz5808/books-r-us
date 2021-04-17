import React from "react";
import axios from "axios";
import { Container, Card, Title, Author, Cover } from "./favorites.styles";

class Favorites extends React.Component {
  state = {
    data: [],
  };

  fetchFavorite = () => {
    this.props.favorites.map((favorite) => {
      const retrieveFavorite = async (favorite) => {
        try {
          const { data } = await axios(
            `https://www.googleapis.com/books/v1/volumes/${favorite}`
          );
          const updatedState = { ...this.state.data };
          updatedState[favorite] = data.volumeInfo;
          this.setState({ data: updatedState });
        } catch (error) {
          console.log(error);
        }
      };
      retrieveFavorite(favorite);
      return favorite;
    });
  };
  componentDidMount() {
    this.fetchFavorite();
  }
  render() {
    return (
      <>
        {this.state.data && (
          <Container>
            {Object.entries(this.state.data).map((entry) => {
              const [key, value] = entry;
              return (
                <Card>
                  <Title>{value.title}</Title>
                  <Author>{value.authors}</Author>
                  <Cover>
                    <img src={value.imageLinks.thumbnail} alt={value.title} />
                  </Cover>
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
