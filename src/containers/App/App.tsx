// React
import React, { Component } from 'react';

// Dependencies
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// Components
import SideNav from '../../components/SideNav/SideNav';
import Item from '../../interfaces/item';
import MenuItem from '../../interfaces/menu-item';

// Interfaces
import State from '../../interfaces/state';

// Services
import GitHubService from '../../services/github';

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
    menu: [],
    path: '',
  }

  public componentDidMount(): void {
    const items: Item[] = [];
    const menu: MenuItem[] = [];

    this.getRepoContents(items, menu)
      .subscribe((response: any) => {
        this.setState({
          items: items,
          menu: menu
        });

        this.goToReadme();
      });
  }

  private getRepoContents(items: Item[], menu: MenuItem[], path?: string): Observable<any> {
    return new Observable((observer) => {
      this.gitHubService.getContents(path)
        .pipe(take(1))
        .subscribe((response: Item[]) => {
          const observablesArray: any[] = [];

          response.forEach((item: Item) => {
            items.push(item)

            const menuItem: MenuItem = {
              path: item.path,
              name: item.name,
              sha: item.sha,
            };
            menu.push(menuItem);

            if (item.type === "dir") {
              menuItem.children = [];
              observablesArray.push(this.getRepoContents(items, menuItem.children, item.path));
            }
          });

          if (observablesArray.length > 0) {
            forkJoin(observablesArray).subscribe(() => {
              observer.next(true);
              observer.complete();
            });
          } else {
            observer.next(true);
            observer.complete();
          }
        });
    });
  }

  private getItemIndex(path: string): number {
    return this.state.items.length ? this.state.items.findIndex((item: Item) => item.path === path): -1;
  }

  private fileHasContents(path: string): boolean {
    const itemIndex: number = this.getItemIndex(path);
    return this.state.items[itemIndex] && this.state.items[itemIndex].hasOwnProperty('content');
  }

  private getFileContents(path: string): void {
    this.gitHubService.getFileContents(path)
      .pipe(take(1))
      .subscribe((response: string) => {
        const itemIndex: number = this.getItemIndex(path);
        const newItems: any[] = [...this.state.items];
        newItems[itemIndex].content = response;
        this.setState({items: newItems});
      });
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
      .pipe(take(1))
      .subscribe((response: Item) => {
        this.handlePathChange(response.path);
        this.props.history.push(response.path);
      });
  }

  render() {
    return (
      <div className="App">
        <SideNav
          location={this.props.location.pathname}
          menu={this.state.menu}
          items={this.state.items}
          handlePathChange={(path: string) => this.handlePathChange(path)}
        />
        {/* <Route
          path="/:path"
          render={(props) => (
            <Main
              {...props}
              items={this.state.items}
              handlePathChange={(path: string) => this.handlePathChange(path)}
            />
          )}
        /> */}
    </div>
    );
  }
}

export default App;
