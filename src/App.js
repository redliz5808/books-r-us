import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home/index";
import { Favorites } from "./pages/Favorites/index";
import Search from "./components/Search/index";
import SearchPage from "./pages/SearchPage/index";
import { Book } from "./pages/Book/index";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Search />
            </li>
            <li>
              <Link to="/favorites">★</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route component={Book} path="/book/:isbn"></Route>
          <Route component={SearchPage} path="/search/:searchTerm"></Route>
        </Switch>
      </div>
    </Router>
  );
}
