import React from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Container, Card, Title, Author, Cover } from "./favorites.styles";

class Favorites extends React.Component {
  state = {
    data: [],
    isLoading: false,
  };

  fetchFavorite = () => {
    this.props.favorites.map((favorite) => {
      const retrieveFavorite = async (favorite) => {
        try {
          this.setState({ isLoading: true });
          const { data } = await axios(
            `https://www.googleapis.com/books/v1/volumes/${favorite}`
          );
          const updatedState = { ...this.state.data };
          updatedState[favorite] = data.volumeInfo;
          this.setState({ data: updatedState, isLoading: false });
        } catch (error) {
          this.setState({ isLoading: true });
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
        {this.state.isLoading && <Loading />}
        {this.state.data && !this.state.isLoading && (
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
