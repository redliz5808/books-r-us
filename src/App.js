import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/";
import Favorites from "./pages/Favorites/";
import Search from "./components/Search/";
import SearchPage from "./pages/SearchPage/";
import Book from "./pages/Book/";
import "./App.css";
import { StyledLink, BigStar } from "./app.styles";
import { FaStar } from "react-icons/fa";

export default class App extends React.Component {
  state = {
    favorites: [],
  };

  handleClick = (id) => {
    const { favorites } = this.state;
    let modifiedFavorites = [];
    if (favorites.includes(id)) {
      modifiedFavorites = favorites.filter((favorite) => favorite !== id);
      this.setState({ favorites: modifiedFavorites });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      modifiedFavorites = favorites.concat(id);
      this.setState({ favorites: modifiedFavorites });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  componentDidMount() {
    this.setState({
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    });
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <StyledLink to="/">Home</StyledLink>
              </li>
              <li>
                <Search />
              </li>
              <li>
                <StyledLink to="/favorites">
                  <BigStar>
                    <FaStar />
                  </BigStar>
                </StyledLink>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route
              render={(props) => (
                <Favorites {...props} favorites={this.state.favorites} />
              )}
              path="/favorites"
            ></Route>
            <Route component={Home} exact path="/"></Route>
            <Route
              render={(props) => (
                <Book
                  {...props}
                  handleClick={this.handleClick}
                  favorites={this.state.favorites}
                />
              )}
              path="/book/:isbn"
            ></Route>
            <Route component={SearchPage} path="/search/:searchTerm"></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
