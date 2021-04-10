import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./home.styles";
import { Card } from "./home.styles";

export class Home extends React.Component {
  state = {
    horror: {},
    romance: {},
    mystery: {},
    nonfiction: {},
    history: {},
  };

  getBookData = async (subject) => {
    try {
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=40&key=${process.env.REACT_APP_API_KEY}`
      );
      if (subject === "horror") {
        this.setState({ horror: data.items });
      } else if (subject === "romance") {
        this.setState({ romance: data.items });
      } else if (subject === "mystery") {
        this.setState({ mystery: data.items });
      } else if (subject === "nonfiction") {
        this.setState({ nonfiction: data.items });
      } else if (subject === "history") {
        this.setState({ history: data.items });
      }
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

  MappedHorrorData = () => {
    const mappedData = this.state.horror.map((book) => {
      return (
        <Card>
          <Link to={`/book/${book.id}`}>
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

  MappedRomanceData = () => {
    const mappedData = this.state.romance.map((book) => {
      return (
        <Card>
          <Link to={`/book/${book.id}`}>
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

  MappedMysteryData = () => {
    const mappedData = this.state.mystery.map((book) => {
      return (
        <Card>
          <Link to={`/book/${book.id}`}>
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

  MappedNonfictionData = () => {
    const mappedData = this.state.nonfiction.map((book) => {
      return (
        <Card>
          <Link to={`/book/${book.id}`}>
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

  MappedHistoryData = () => {
    const mappedData = this.state.history.map((book) => {
      return (
        <Card>
          <Link to={`/book/${book.id}`}>
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
        <h1>Horror</h1>
        {this.state.horror.length && <div>{this.MappedHorrorData()}</div>}
        <h1>Romance</h1>
        {this.state.romance.length && <div>{this.MappedRomanceData()}</div>}
        <h1>Mystery</h1>
        {this.state.mystery.length && <div>{this.MappedMysteryData()}</div>}
        <h1>Nonfiction</h1>
        {this.state.nonfiction.length && <div>{this.MappedNonfictionData()}</div>}
        <h1>History</h1>
        {this.state.history.length && <div>{this.MappedHistoryData()}</div>}
      </>
    );
  }
}
