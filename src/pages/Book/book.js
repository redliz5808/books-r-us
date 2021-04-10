import axios from "axios";
import React from "react";
import { Cover } from "../../components/Cover/cover";
import { Title } from "../../components/Title/title";
import { Author } from "../../components/Author/author";
import { Description } from "../../components/Description/description";
import { Container } from "./book.styles";

export class Book extends React.Component {
  state = {
    data: {},
  };

  getBook = async (isbn) => {
    try {
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data: data.items[0] });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const url = window.location.href.split("/");
    const isbn = url[url.length - 1];
    this.getBook(isbn);
  }

  render() {
    return (
      <>
        Test
        {this.state.data.length && (
          <Container>
            <Cover
              coverUrl={this.state.data.volumeInfo.imageLinks.thumbnail}
              title={this.state.data.volumeInfo.title}
            />
            <Title title={this.state.data.volumeInfo.title} />
            <Author authors={this.state.data.volumeInfo.authors} />
            <Description description={this.state.data.volumeInfo.description} />
          </Container>
        )}
      </>
    );
  }
}
