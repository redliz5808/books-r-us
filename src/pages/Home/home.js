import axios from "axios";
import React from "react";

export class Home extends React.Component {
  state = {
    data: {},
  };
  getBooksByGenre = async (subject) => {
    try {
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=40&key=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data: data.items });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getBooksByGenre("horror");
  }

  MappedData = () => {
    const mappedData = this.state.data.map((object) => {
      return (
        <div>
          {object.volumeInfo.title}
          <div>
            <img
              src={`${object.volumeInfo.imageLinks.thumbnail}`}
              alt="book cover"
            />
          </div>
        </div>
      );
    });
    return <li>{mappedData}</li>;
  };

  render() {
    return <>{this.state.data.length && <div>{this.MappedData()}</div>}</>;
  }
}
