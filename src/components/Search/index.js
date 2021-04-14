import React from "react";
import { withRouter } from "react-router-dom";

class Search extends React.Component {
  state = {
    value: null,
  };
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.value}`);
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <span>Search:</span>
          <input onChange={this.handleChange} />
        </form>
      </>
    );
  }
}

export default withRouter(Search);
