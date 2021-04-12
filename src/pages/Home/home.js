import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./home.styles";
import { Card } from "./home.styles";

export class Home extends React.Component {
  state = {
    horror: null,
    romance: null,
    mystery: null,
    nonfiction: null,
    history: null,
    isLoading: false,
  };

  getBookData = async (subject) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=40&key=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ [subject]: data.items, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getBookData("horror");
    this.getBookData("romance");
    this.getBookData("mystery");
    this.getBookData("nonfiction");
    this.getBookData("history");
  }

  MappedData = (genre) => {
    const mappedData = this.state[genre].map((book) => {
      return (
        <Card>
          <Link
            to={`/book/${book.volumeInfo.industryIdentifiers[0].identifier}`}
          >
            <div>{book.volumeInfo.title}</div>
            <div>
              <img
                src={`${book.volumeInfo.imageLinks.thumbnail}`}
                alt={`${book.volumeInfo.title}`}
              />
            </div>
          </Link>
        </Card>
      );
    });
    return <Container>{mappedData}</Container>;
  };

  render() {
    return (
      <>
        {this.state.isLoading && <>Loading...</>}
        {this.state.horror && !this.state.isLoading && (
          <>
            <h1>Horror</h1>
            <div>{this.MappedData("horror")}</div>
          </>
        )}

        {this.state.romance && !this.state.isLoading && (
          <>
            <h1>Romance</h1>
            <div>{this.MappedData("romance")}</div>
          </>
        )}

        {this.state.mystery && !this.state.isLoading && (
          <>
            <h1>Mystery</h1>
            <div>{this.MappedData("mystery")}</div>
          </>
        )}

        {this.state.nonfiction && !this.state.isLoading && (
          <>
            <h1>Nonfiction</h1>
            <div>{this.MappedData("nonfiction")}</div>
          </>
        )}

        {this.state.history && !this.state.isLoading && (
          <>
            <h1>History</h1>
            <div>{this.MappedData("history")}</div>
          </>
        )}
      </>
    );
  }
}
