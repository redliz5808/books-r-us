import React from "react";
import axios from "axios";
import { AllBooks } from "../../components/AllBooks/allBooks";

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

  render() {
    return (
      <>
        {this.state.isLoading && <>Loading...</>}
        {!this.state.isLoading &&
          this.state.horror &&
          this.state.romance &&
          this.state.mystery &&
          this.state.nonfiction &&
          this.state.history && (
            <>
              <AllBooks data={this.state.horror} genre="Horror" />
              <AllBooks data={this.state.romance} genre="Romance" />
              <AllBooks data={this.state.mystery} genre="Mystery" />
              <AllBooks data={this.state.nonfiction} genre="Nonfiction" />
              <AllBooks data={this.state.history} genre="History" />
            </>
          )}
      </>
    );
  }
}
