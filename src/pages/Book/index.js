import React from "react";
import axios from "axios";
import Cover from "../../components/Cover";
import Title from "../../components/Title";
import Author from "../../components/Author";
import Description from "../../components/Description";
import { Container, CoverDiv, Favorite } from "./book.styles";

class Book extends React.Component {
  state = {
    data: null,
    isLoading: false,
  };

  getBook = async (isbn) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data: data.items[0], isLoading: false });
      this.state.data.favorited = false;
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { isbn } = this.props.match.params;
    this.getBook(isbn);
  }

  handleClick = (id) => {
    const book = { ...this.state.data };
    book.favorited = !book.favorited;
    this.setState({ data: book });
    this.props.handleClick(id);
  };

  render() {
    let button = "";
    if (
      this.props.favorites &&
      this.state.data &&
      this.props.favorites.includes(this.state.data.id)
    ) {
      button = (
        <Favorite onClick={() => this.handleClick(this.state.data.id)}>
          ★
        </Favorite>
      );
    } else {
      button = (
        <Favorite onClick={() => this.handleClick(this.state.data.id)}>
          ☆
        </Favorite>
      );
    }
    return (
      <>
        {this.state.isLoading && <>Loading...</>}
        {this.state.data && !this.state.isLoading && (
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
            <Description description={this.state.data.volumeInfo.description} />
          </Container>
        )}
      </>
    );
  }
}

export default Book;
