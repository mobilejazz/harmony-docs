// React
import React, { Component } from 'react';

// Services
import GitHubService from '../../services/github';

// Components
import SideNav from '../../components/SideNav/SideNav';
import Main from '../../components/Main/Main';

// Assets
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
    fileTree: [],
  }

  componentDidMount(): void {
    this.gitHubService.getContents().subscribe((response: any) => {
      this.setState({fileTree: response});
    });

    // this.gitHubService.getFileContents('CacheRepository.md').subscribe((response: string) => {
    //   this.setState({file: response})
    // });
  }

  render() {
    return (
      <div className="App">
        <SideNav fileTree={this.state.fileTree} />
        <Main />
      </div>
    );
  }
}

export default App;
