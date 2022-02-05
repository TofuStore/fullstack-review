import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      added: ''
    }

    this.search = this.search.bind(this);
    this.setState = this.setState.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  fetch() {
    let newData;
    $.get('/repos', (data) => {
      console.log(data);
      this.setState({
        repos: data
      })
    })
  }

  componentDidMount() {
    this.fetch();
  }

  search (term) {
    console.log(`${term} was searched`);

    $.post('/repos', {term: term})
    .done( (data) => {
      this.setState({
        added: data
      })
      this.fetch();
    });
  }

  render () {
    let added = <div></div>;
    if (this.state.added) {
      added = <div>{this.state.added} new repos imported</div>
    }
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      {added}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));