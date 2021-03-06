import React, { Component } from 'react';
import PostContainer from './components/PostContainer/PostContainer';
import SearchBar from './components/SearchBar/SearchBar';
import dummyData from './dummy-data';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      search: "",
      data: [],
    };
    this.updateDataText = this.updateDataText.bind(this);
  }

  componentDidMount = () => {
    this.setState({ data: dummyData });
  }

  filterPosts = () => {
    let query = this.state.search;
    let postArray = [ ...this.state.data ];

    postArray = postArray.filter(element => element.username.includes(query));
    
    return postArray.map((post) => {
      return (<PostContainer 
        key={post.id} 
        data={post} 
        state={this.state}
        addCom={(e) => this.addComment(e, post.id)}
        update={this.updateDataText}  
      />
    )});
  }

  updateDataText = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  addComment = (e, id) => {
    const newComment = {
      username: "mister-corn",
      text: this.state.comment,
    }
    // console.log("addComment e.target ", e.target);
    // console.log("addComment id ", id);

    const postIndex = this.state.data.findIndex(p => p.id === id);
    const post = { ...this.state.data[postIndex] }
    // console.log("addComment post ", post);
    post.comments = [...post.comments, newComment];
    // console.log("addcoment post+NewComment ", post.comments);
    
    const posts = [ ...this.state.data ];
    posts[postIndex] = post;

    this.setState({ comment: "", data: posts });

  }

  render() {
    return (
      <div className="App">
        <SearchBar
          filter={this.filterPosts}
          state={this.state} 
          update={this.updateDataText}
        />
        { this.filterPosts() }
      </div>
    );
  }
    // return <h1>Test</h1>;
}

export default App;
