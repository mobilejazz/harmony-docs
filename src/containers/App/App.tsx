// React
import React, { Component } from 'react';

// Dependencies
import { Route } from 'react-router-dom';
import { take } from 'rxjs/operators';

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

class App extends Component<any> {
  constructor(
    props: any,
    private gitHubService: GitHubService,
  ) {
    super(props);
    this.gitHubService = new GitHubService();
  }

  state: State = {
    items: [],
    path: '',
  }

  public componentDidMount(): void {
    this.getRepoContents();
  }

  private getRepoContents(): void {
    this.gitHubService.getContents()
      .pipe(
        take(1)
      )
      .subscribe(
        (response: Item[]) => {
          const newItems: Item[] = response;
          this.setState({items: newItems});
          this.goToReadme();
          this.getSubDirRepoContents();
        },
        err => {}
      );
  }

  private getSubDirRepoContents(): void {
    this.state.items.forEach((item: Item) => {
      if (item.type === "dir") {
        this.getDirContents(item.path);
      }
    });
  }

  private getDirContents(path: string): void {
    this.gitHubService.getDirContents(path)
    .pipe(
      take(1)
    )
    .subscribe(
      (response: Item[]) => {
        const newItems: Item[] = [...this.state.items].concat(response);
        this.setState({items: newItems});
      },
      err => {}
    );
  }

  private getItemIndex(path: string): number {
    return this.state.items.findIndex((item: Item) => item.path === path);
  }

  private fileHasContents(path: string): boolean {
    const itemIndex: number = this.getItemIndex(path);
    return this.state.items[itemIndex] && this.state.items[itemIndex].hasOwnProperty('content');
  }

  private getFileContents(path: string): void {
    this.gitHubService.getFileContents(path)
      .pipe(
        take(1)
      )
      .subscribe(
        (response: string) => {
          const itemIndex: number = this.getItemIndex(path);
          const newItems: any[] = [...this.state.items];
          newItems[itemIndex].content = response;
          this.setState({items: newItems});
        },
        err => {}
      );
  }

  private handlePathChange(path: string): void {
    if (path === this.state.path) {
      return;
    }

    if (!this.fileHasContents(path)) {
      this.getFileContents(path);
    }

    const newPath: string = path;

    this.setState({path: newPath});
  }

  private goToReadme(): void {
    if (this.props.location.pathname !== '/') {
      return;
    }
    
    this.gitHubService.getReadme()
    .pipe(
      take(1)
    )
    .subscribe(
      (response: Item) => {
        this.handlePathChange(response.path);
        this.props.history.push(response.path);
      },
      err => {}
    );
  }

  render() {
    return (
      <div className="App">
        <SideNav
          location={this.props.location.pathname}
          items={this.state.items}
          handlePathChange={(path: string) => this.handlePathChange(path)}
        />
        <Route
          path="/:path"
          render={(props) => (
            <Main
              {...props}
              items={this.state.items}
              handlePathChange={(path: string) => this.handlePathChange(path)}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
