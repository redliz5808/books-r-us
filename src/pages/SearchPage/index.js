import React from "react";
import axios from "axios";
import Loading from "../../components/Loading/";
import SearchFor from "../../components/SearchFor";
import unavailableCover from "../../assets/unavailableCover.png";

class SearchPage extends React.Component {
  state = {
    data: null,
    isLoading: false,
  };
  getBooks = async (searchTerm) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&inauthor:${searchTerm}&subject:${searchTerm}&maxResults=40&key=${process.env.REACT_APP_API_KEY}`
      );
      this.setState({ data: data.items, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const { searchTerm } = this.props.match.params;
    this.getBooks(searchTerm);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.searchTerm !== this.props.match.params.searchTerm
    ) {
      const { searchTerm } = this.props.match.params;
      this.getBooks(searchTerm);
    }
  }

  render() {
    const readyToLoad = !this.state.isLoading && this.state.data;
    return (
      <>
        <SearchFor searchTerm={this.props.match.params.searchTerm}/>
        {this.state.isLoading && <Loading />}
        {readyToLoad && (
          <>
            {Object.entries(this.state.data).map((book) => {
              const [key, value] = book;
              let imageSrc = "";
              if (!value.volumeInfo.imageLinks) {
                imageSrc = unavailableCover;
              } else {
                imageSrc = value.volumeInfo.imageLinks.thumbnail;
              }
              return (
                <>
                  <h4>{value.volumeInfo.title}</h4>
                  <h5>{value.volumeInfo.authors}</h5>
                  <img src={imageSrc} alt={value.volumeInfo.title} />
                </>
              );
            })}
          </>
        )}
      </>
    );
  }
}

export default SearchPage;
