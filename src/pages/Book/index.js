import React from "react";
import axios from "axios";
import Cover from "../../components/Cover";
import Title from "../../components/Title";
import Author from "../../components/Author";
import Description from "../../components/Description";
import Loading from "../../components/Loading";
import NytReviews from "../../components/NytReviews";
import {
  Main,
  Container,
  CoverDiv,
  Favorite,
  NytContainer,
} from "./book.styles";
import { FaStar, FaRegStar } from "react-icons/fa";

class Book extends React.Component {
  state = {
    data: null,
    isLoading: false,
  };

  getBook = async (id) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      const favorited = data;
      favorited.favorited = false;
      this.setState({ data: favorited, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getBook(id);
    let favoritedBooks =
      JSON.parse(localStorage.getItem("favoritedBooks")) || {};
    this.setState({ favoritedBooks });
  }

  handleClick = (id) => {
    const book = { ...this.state.data };
    book.favorited = !book.favorited;
    let favoritedBooks =
      JSON.parse(localStorage.getItem("favoritedBooks")) || {};
    let modifiedFavorites = [];
    if (favoritedBooks[id]) {
      modifiedFavorites = Object.entries(favoritedBooks).filter(
        ([key, value]) => value.id !== id
      );
      const favoritesObject = Object.fromEntries(modifiedFavorites);
      this.setState({ favoritedBooks: favoritesObject }, function () {
        localStorage.setItem(
          "favoritedBooks",
          JSON.stringify(this.state.favoritedBooks)
        );
      });
    } else {
      favoritedBooks[book.id] = book;
      localStorage.setItem("favoritedBooks", JSON.stringify(favoritedBooks));
      this.setState({ data: book, favoritedBooks });
    }
  };

  render() {
    const favoritesReadyToLoad =
      this.state.data && this.state.favoritedBooks[this.state.data.id];

    const button = (
      <Favorite onClick={() => this.handleClick(this.state.data.id)}>
        {favoritesReadyToLoad ? <FaStar /> : <FaRegStar />}
      </Favorite>
    );

    return (
      <>
        {this.state.isLoading && <Loading />}
        {this.state.data && !this.state.isLoading && (
          <Main>
            <Container>
              <CoverDiv>
                <Cover
                  coverUrl={this.state.data.volumeInfo.imageLinks.thumbnail}
                  title={this.state.data.volumeInfo.title}
                />
              </CoverDiv>
              {button}
              <Title title={this.state.data.volumeInfo.title} />
              <Author authors={this.state.data.volumeInfo.authors} />
              <Description
                description={this.state.data.volumeInfo.description}
              />
            </Container>
            <NytContainer>
              <NytReviews
                title={this.state.data.volumeInfo.title}
                author={this.state.data.volumeInfo.authors}
                isbn={
                  this.state.data.volumeInfo.industryIdentifiers[1].identifier
                }
              />
            </NytContainer>
          </Main>
        )}
      </>
    );
  }
}

export default Book;
