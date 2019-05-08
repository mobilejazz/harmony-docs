import React, { Component } from 'react';
import Markdown from 'react-markdown';

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
      this.setState({file: response})
    });
  }

  render() {
    return (
      <div className="App">
        <Markdown
          escapeHtml={true}
          source={this.state.file} />
      </div>
    );
  }
}

export default App;
