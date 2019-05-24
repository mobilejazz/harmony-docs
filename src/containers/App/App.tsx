// React
import React, { Component } from 'react';

// Dependencies
import { Route } from 'react-router-dom';

// Interfaces
import State from '../../interfaces/state';
import Item from '../../interfaces/item';

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

  state: State = {
    contents: [],
    path: '',
  }

  public componentDidMount(): void {
    this.getRepoContents();
  }

  private getRepoContents(): void {
    const repoSubscription = this.gitHubService.getContents().subscribe((response: Item[]) => {
      const newContents: Item[] = response.map((item: Item) => {
        return {
          info: item,
        };
      });

      this.setState({contents: newContents});
      repoSubscription.unsubscribe();
    });
  }

  private getItemIndex(path: string): number {
    return this.state.contents.findIndex((item: Item) => item.info.path === path);
  }

  private fileHasContents(path: string): boolean {
    const itemIndex = this.getItemIndex(path);
    return this.state.contents[itemIndex].hasOwnProperty('content');
  }

  private getFileContents(path: string): void {
    const itemIndex: number = this.getItemIndex(path);
    const newContents: Item[] = [...this.state.contents];

    const fileSubscription = this.gitHubService.getFileContents(path).subscribe((response: string) => {
      newContents[itemIndex].content = response;
      this.setState({contents: newContents});
      fileSubscription.unsubscribe();
    });
  }

  private handlePathChange(path: string): void {
    if (path === this.state.path) {
      return;
    }

    if (!this.fileHasContents(path)) {
      this.getFileContents(path);
    }

    this.setState({path: path});
  }

  render() {
    return (
      <div className="App">
        <SideNav contents={this.state.contents} handlePathChange={(path: string) => this.handlePathChange(path)} />
        <Route
          path="/:path"
          render={(props) => (
            <Main
              {...props}
              contents={this.state.contents}
              handlePathChange={(path: string) => this.handlePathChange(path)}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
