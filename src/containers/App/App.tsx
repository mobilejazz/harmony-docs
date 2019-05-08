import React, { Component } from 'react';

import GitHubService from '../../services/github';

import './App.scss';

class App extends Component {
  constructor(
    props: any,
    private gitHubService: GitHubService,
  ) {
    super(props);
    this.gitHubService = new GitHubService();
  }

  state = {
    file: '',
  }

  componentDidMount(): void {
    // Testing
    /*this.gitHubService.getContents().subscribe((response: any) => {
      console.log(response);
    });*/

    this.gitHubService.getFileContents('CacheRepository.md').subscribe((response: string) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
