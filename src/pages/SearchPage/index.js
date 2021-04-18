import React from "react";
import axios from "axios";
import Loading from "../../components/Loading/";
import SearchFor from "../../components/SearchFor";
import unavailableCover from "../../assets/unavailableCover.png";
import PageNumbers from "../../components/PageNumbers";
import { Container, Card, Cover, Author, Title } from "./searchPage.styles";

class SearchPage extends React.Component {
  state = {
    data: null,
    isLoading: false,
    pageToLoad: 0,
  };

  getBooks = async (searchTerm) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&inauthor:${searchTerm}&subject:${searchTerm}&orderBy=relevance&startIndex=${this.state.pageToLoad}&maxResults=40&key=${process.env.REACT_APP_API_KEY}`
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
    const { searchTerm } = this.props.match.params;
    if (prevProps.match.params.searchTerm !== searchTerm) {
      this.getBooks(searchTerm);
    }
    if (prevState.pageToLoad !== this.state.pageToLoad) {
      this.getBooks(searchTerm);
    }
  }

  handlePageClick = (button) => {
    let currentPage = this.state.pageToLoad;
    if (button === "Previous" && this.state.pageToLoad === 0) {
      return null;
    } else if (button === "Previous" && this.state.pageToLoad !== 0) {
      currentPage = currentPage - 1;
      this.setState({ pageToLoad: currentPage });
    } else if (button === "Next") {
      currentPage = currentPage + 1;
      this.setState({ pageToLoad: currentPage });
    } else {
      this.setState({ pageToLoad: button });
    }
  };

  render() {
    const readyToLoad = !this.state.isLoading && this.state.data;
    return (
      <>
        <SearchFor searchTerm={this.props.match.params.searchTerm} />
        {this.state.isLoading && <Loading />}
        {readyToLoad && (
          <>
            <Container>
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
                    <Card>
                      <Title>{value.volumeInfo.title}</Title>
                      <Author>{value.volumeInfo.authors}</Author>
                      <Cover>
                        <img src={imageSrc} alt={value.volumeInfo.title} />
                      </Cover>
                    </Card>
                  </>
                );
              })}
            </Container>
            <PageNumbers handlePageClick={this.handlePageClick} />
          </>
        )}
      </>
    );
  }
}

export default SearchPage;
