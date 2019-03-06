import React, { Component, Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { recipes } from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";

class App extends Component {
  state = {
    recipes: recipes,
    url:
      "https://www.food2fork.com/api/search?key=6a1e4917f685b1131e89f2b4628c5d0c",
    base_url:
      "https://www.food2fork.com/api/search?key=6a1e4917f685b1131e89f2b4628c5d0c",
    detail_id: 35382,
    pageIndex: 1,
    search: "",
    query: "&q="
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();

      this.setState({
        recipes: jsonData.recipes
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  displayPage = index => {
    switch (index) {
      case 1:
        return (
          <RecipeList
            recipes={this.state.recipes}
            handleDetail={this.handleDetail}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        );
      case 0:
        return (
          <RecipeDetail
            id={this.state.detail_id}
            handleIndex={this.handleIndex}
          />
        );

      default:
        break;
    }
  };

  handleIndex = index => {
    this.setState({
      pageIndex: index
    });
  };

  handleDetail = (index, id) => {
    this.setState({
      pageIndex: index,
      detail_id: id
    });
  };

  handleChange = e => {
    this.setState(
      {
        search: e.target.value
      },
      () => {
        console.log(this.state.search);
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      () => {
        return { url: `${base_url}${query}${search}`, search: "" };
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    // console.log(this.state.recipes)
    return <Fragment>{this.displayPage(this.state.pageIndex)}</Fragment>;
  }
}

export default App;
