import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/";
import Favorites from "./pages/Favorites/";
import Search from "./components/Search/";
import SearchPage from "./pages/SearchPage/";
import Book from "./pages/Book/";
import { StyledLink, BigStar, MyGlobalStyle, NavUl, NavLi } from "./app.styles";
import { FaStar } from "react-icons/fa";

const App = () => {
  return (
    <>
      <MyGlobalStyle />
      <Router>
        <div>
          <nav>
            <NavUl>
              <NavLi>
                <StyledLink to="/">Home</StyledLink>
              </NavLi>
              <NavLi>
                <Search />
              </NavLi>
              <NavLi>
                <StyledLink to="/favorites">
                  <BigStar>
                    <FaStar />
                  </BigStar>
                </StyledLink>
              </NavLi>
            </NavUl>
          </nav>

          <Switch>
            <Route component={Favorites} path="/favorites"></Route>
            <Route component={Home} exact path="/"></Route>
            <Route component={Book} path="/book/:id"></Route>
            <Route component={SearchPage} path="/search/:searchTerm"></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
