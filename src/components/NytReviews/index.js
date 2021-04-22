import React from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Title, Frame } from "./nytReviews.styles";

class NytReviews extends React.Component {
  state = {
    data: null,
    isLoading: false,
  };

  retrieveReviews = async (author) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://api.nytimes.com/svc/books/v3/reviews.json?author=${author[0]
          .split(" ")
          .join("+")}&api-key=${process.env.REACT_APP_NYT_API_KEY}`
      );
      this.setState({ data: data.results, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.retrieveReviews(this.props.author);
  }
  render() {
    return (
      <>
        {this.state.isLoading && <Loading />}
        {this.state.data && !this.state.isLoading && (
          <>
            <Title>New York Times Author Reviews</Title>
            <div>
              {Object.entries(this.state.data).map((entry) => {
                return (
                  <Frame
                    title={this.state.data.title}
                    width="100%"
                    height="500px"
                    src={entry[1].url}
                    sandbox=""
                  ></Frame>
                );
              })}
            </div>
          </>
        )}
      </>
    );
  }
}

export default NytReviews;
