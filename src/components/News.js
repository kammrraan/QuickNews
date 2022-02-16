import React, { Component } from "react";
import Button from "./Button";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - QuickNews`;
  }

  updatePage = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a6a4d4b93984dde984f418ad0807c3a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  async componentDidMount() {
    // console.log('cdm');
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a6a4d4b93984dde984f418ad0807c3a&page=1&pageSize=${this.props.pageSize}`
    // this.setState({ loading : true })
    // const data = await fetch(url)
    // const parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })

    this.updatePage();
  }

  handlePrevClick = async () => {
    console.log("Previous");
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a6a4d4b93984dde984f418ad0807c3a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({ loading : true })
    // const data = await fetch(url)
    // const parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading : false

    // })

    this.setState({
      page: this.state.page - 1,
    });
    this.updatePage();
  };

  handleNextClick = async () => {
    console.log("next");
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {}
    // else {
    //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a6a4d4b93984dde984f418ad0807c3a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //   this.setState({ loading : true })
    //   const data = await fetch(url)
    //   const parsedData = await data.json()
    //   console.log(parsedData);
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading : false

    //   })
    // }
    this.setState({
      page: this.state.page + 1,
    });
    this.updatePage();
  };

  // disableButton=()=>{
  //   this.state.page+1 > Math.ceil(this.state.totalResults / 20)
  // }[]

  render() {
    return (
      <div className="conatiner my-4 mx-5 ">
        <div className="container text-center" style={{ margin: "35px 0px" }}>
          <h1>QuickNews - Top {this.props.category} Headlines</h1>
        </div>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles[0] &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    urlToImage={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://static01.nyt.com/images/2022/02/23/fashion/23MUGLER-SUB/23MUGLER-SUB-facebookJumbo.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between my-5">
          <Button
            title="&larr; Previous"
            disable={this.state.page <= 1}
            handler={this.handlePrevClick}
          />
          <Button
            title="Next &rarr;"
            disable={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            handler={this.handleNextClick}
          />
        </div>
        {/*
         */}
      </div>
    );
  }
}

export default News;
