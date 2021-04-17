import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/";
import Favorites from "./pages/Favorites/";
import Search from "./components/Search/";
import SearchPage from "./pages/SearchPage/";
import Book from "./pages/Book/";
import "./App.css";
import { StyledLink } from "./app.styles";

export default class App extends React.Component {
  state = {
    favorites: [],
  };

  handleClick = (id) => {
    const index = this.state.favorites.indexOf(id);
    const { favorites } = this.state;
    if (this.state.favorites.includes(id) && index !== -1) {
      this.state.favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      this.state.favorites.push(id);
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
                <StyledLink to="/favorites" style={{fontSize:"25px"}}>★</StyledLink>
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
            <Route exact path="/">
              <Home />
            </Route>
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
