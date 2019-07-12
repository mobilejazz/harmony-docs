// React
import React, { Component } from 'react';

// Dependencies
import { Route } from 'react-router-dom';
import { take, map, combineAll, zip, mergeAll, mergeMap } from 'rxjs/operators';
import { empty, forkJoin, Observable} from 'rxjs';

// Interfaces
import State from '../../interfaces/state';
import Item from '../../interfaces/item';
import MenuItem from '../../interfaces/menu-item';

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
    menu: [],
    path: '',
  }

  public componentDidMount(): void {
    const items: Item[] = [];
    const menu: MenuItem[] = [];
    this.getRepoContents(0, items, menu)
      .subscribe((response) => {
        const existingItems = [...this.state.items];
        const existingMenu = [...this.state.menu];
        console.log('repaint')
        console.log('response', response)
        this.setState({
          items: [...existingItems, ...items],
          menu: [...existingMenu, ...menu]
        });
        this.goToReadme();
    });
  }

  private getRepoContents(level: number, items: Item[], menu: MenuItem[], path?: string): Observable<any> {
    return this.gitHubService.getContents(path)
      .pipe(
        take(1),
        mergeMap((response: Item[]) => {
          console.log('current Level', level)
          const observablesArray: any = []; // TODO: Add interface

          response.forEach((item: Item) => {
            // Add item
            items.push(item)

            // Create menu item
            const menuItem: MenuItem = {
              path: item.path,
              name: item.name,
              sha: item.sha,
            };

            menu.push(menuItem)

            // If item is a directory, let's get it's children
            if (item.type === "dir") {
              menuItem.children = [];
              observablesArray.push(this.getRepoContents(level + 1, items, menuItem.children, item.path).subscribe());
            }
          });

          console.log('oblength', observablesArray.length)
          return observablesArray.length > 0 ? forkJoin(observablesArray) : Observable.create();
        })
      );
  }

  private getItemIndex(path: string): number {
    return this.state.items.length ? this.state.items.findIndex((item: Item) => item.path === path): -1;
  }

  private getMenuItem(path: string): MenuItem | undefined {
    return this.state.menu.find((menuItem: MenuItem) => menuItem.path === path);
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
